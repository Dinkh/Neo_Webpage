import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';
import NeoArray from "../../../node_modules/neo.mjs/src/util/Array.mjs";

/**
 * Basic Read Multi-Monitor Data and return Details
 * @class Neo.main.addon.ScreenDetails
 * @extends Neo.core.Base
 * @singleton
 */
class ScreenDetails extends Base {
    screenDetails = null;

    fireEventOnItems = [];

    currentScreenLayout = {
        top: null,
        bottom: null,
        left: null,
        right: null,
        center: null,
        current: null
    }

    static config = {
        /**
         * @member {String} className='Neo.main.addon.ScreenDetails'
         * @protected
         */
        className: 'Neo.main.addon.ScreenDetails',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'askForPermission',
                'getAllScreens',
                'getWindowScreen',
                'isMultiScreen',
                'getPermissionStatus',
                'isPWA',
                'setStartingPosition',

                'getAllScreensDetails',
                'getBrowserFrame',
                'getCurrentLayout',
                'registerEventListener',
                'unregisterEventListener',
                'makeFullscreen',
                'windowCreate',
                'windowMove',
                'windowSmaller'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    /**
     * Event currentScreenChange
     * @private
     */
    addCurrentScreenChange() {
        let screenDetails = this.screenDetails;

        if(screenDetails.screens.length === 1) return;

        screenDetails.addEventListener('currentscreenchange', async (event) => {
            let details = screenDetails.currentScreen,
                fireEventOnItems = this.fireEventOnItems,
                current = this.currentScreenLayout.current = this.getPosition(details);

            for (const itemId in fireEventOnItems) {
                const id = fireEventOnItems[itemId];

                Neo.main.DomEvents.sendMessageToApp({
                    id: id,
                    path: [{cls: [], id: id}],

                    type: 'currentscreenchange',
                    value: current
                });
            }
        });
    }

    /**
     * We need the permission from the user to find out more
     * about the Monitor setup
     *
     * @returns {Promise<boolean>}
     * @private
     */
    async getPermissionStatus() {
        let state;

        // todo add this later
        // The new permission name.
        // try {
        //     ({state} = await navigator.permissions.query({
        //         name: "window-management",
        //     }));
        // } catch (err) {
        //     if(err.name !== "TypeError") {
        //         state = `${err.name}: ${err.message}`;
        //     }
        // The old permission name.
        try {
            ({state} = await navigator.permissions.query({
                name: "window-placement",
            }));
        } catch (err) {
            if(err.name === "TypeError") {
                state = "Window management not supported.";
            }
            state = `${err.name}: ${err.message}`;
        }
        // }

        // return state === 'granted';
        return state;
    }

    // Main Browser frame position
    getBrowserFrame() {
        return {
            // Absolute pixels
            top: window.screenTop,
            left: window.screenLeft,
            outerHeight: window.outerHeight,
            outerWidth: window.outerWidth,
            // Relative pixels based on devicePixelRatio
            width: window.innerWidth,
            height: window.innerHeight,

            devicePixelRatio: window.devicePixelRatio
        };
    }

    /**
     * Return Array for the monitor setup
     * @returns {{current: null, top: (boolean|null), left: (boolean|null), bottom: (boolean|null), center: (boolean|null), right: (boolean|null)}}
     */
    getCurrentLayout() {
        const sl = this.currentScreenLayout;

        return {
            top: !!sl.top || null,
            bottom: !!sl.bottom || null,
            left: !!sl.left || null,
            right: !!sl.right || null,
            center: !!sl.center || null,
            current: sl.current
        };
    }

    singleScreenDetail(screen) {
        return {
            devicePixelRatio: screen.devicePixelRatio,
            height: screen.height,
            highDynamicRangeHeadroom: screen.highDynamicRangeHeadroom,
            left: screen.left,
            pixelDepth: screen.pixelDepth,
            top: screen.top,
            width: screen.width
        }
    }

    // old
    getAllScreensDetails() {
        const screenDetails = this.screenDetails.screens,
            current = this.singleScreenDetail(this.screenDetails.currentScreen),
            screenObject = {};

        screenDetails.forEach((screen) => {
            const detailedScreen = this.singleScreenDetail(screen),
                screenPosition = this.getPosition(detailedScreen);

            screenObject[screenPosition] = detailedScreen;
        });

        // remove current from all and add current
        for (const position in screenObject) {
            const item = screenObject[position];
            if(item.left === current.left && item.top === current.top) {
                delete screenObject[position];
                screenObject.current = current;
                screenObject.current.position = position;
                break;
            }
        }

        return screenObject;
    }

    // new
    getAllScreens() {
        const screenDetails = this.screenDetails.screens,
            screenArray = [];

        screenDetails.forEach((screen) => {
            const detailedScreen = this.singleScreenDetail(screen);

            screenArray.push(detailedScreen);
        });

        return screenArray;
    }

    getWindowScreen() {
        return this.singleScreenDetail(this.screenDetails.currentScreen);
    }

    isMultiScreen() {
        return window.screen.isExtended;
    }

    isPWA() {
        let displayMode = 'browser',
            isPWA = false;
        const mqStandAlone = '(display-mode: standalone)';
        if(navigator.standalone || window.matchMedia(mqStandAlone).matches) {
            displayMode = 'standalone';
            isPWA = true;
        }

        if(!isPWA) {
            // todo Abfrage sobald PWA installiert wurde
            window.addEventListener('appinstalled', async (event) => {
                Neo.main.DomEvents.sendMessageToApp({
                    type: 'appinstalled',
                    data: {value1: true}
                });
            });
        }

        return isPWA;
    }

    async askForPermission() {
        let state;

        await window.getScreenDetails()
            .then(() => {state  = 'granted';})
            .catch(() => {state = 'denied';})

        return state;
    }

    setStartingPosition() {
        const screen = window.screen;
        window.resizeTo((screen.availWidth-235),(screen.availHeight-5));
        window.moveTo(0,5);
    }


    /**
     * @returns {String}
     * @private
     */
    async getMonitorDetails() {
        let currentScreen = window.screen,
            hasMultiple = currentScreen.isExtended,
            supportsScreenDetails = 'getScreenDetails' in window;

        if(hasMultiple && supportsScreenDetails) {
            this.getPermissionStatus().then(permission => {
                if(permission) {
                    window.getScreenDetails().then(sd => {
                        this.screenDetails = sd;
                        this.setCurrentScreenLayout();
                        this.addCurrentScreenChange();
                    })
                } else {
                    this.setupSingleScreen();
                }
            });
        } else {
            this.setupSingleScreen();
        }
    }

    /**
     * For each Monitor we have to find out, where it is located
     * @param screen
     * @returns {string}
     * @private
     */
    getPosition(screen) {
        if(screen.top < 0 && screen.left < 0 && (screen.top + screen.height === 0)) return 'top';
        if(screen.top < 0 && screen.left < 0) return 'left';
        if(screen.top > 0 && screen.left < 0) return 'bottom';
        if(screen.top < 0 && screen.left > 0) return 'right';
        return 'center';
    }

    /**
     * Once we have permission, we iterrate the screen's position
     * @private
     */
    setCurrentScreenLayout() {
        const screenDetails = this.screenDetails,
            screens = screenDetails.screens;

        for (const screenId in screens) {
            const screen = screens[screenId];

            this.currentScreenLayout[this.getPosition(screen)] = screen;
        }

        this.currentScreenLayout.current = this.getPosition(this.screenDetails.currentScreen);
    }

    /**
     * Without permission we setup a single screen
     * @private
     */
    setupSingleScreen() {
        const singleScreen = window.screen;
        this.screenDetails = {
            currentScreen: singleScreen,
            oncurrentscreenchange: null,
            onscreenchange: null,
            screens: [singleScreen]
        };
    }

    /**
     * Register event to fire the currentscreenchange
     * @param elementId
     */
    registerEventListener(elementId) {
        NeoArray.add(this.fireEventOnItems, elementId);
    }

    /**
     * Unregister event to fire the currentscreenchange
     * @param elementId
     */
    unregisterEventListener(elementId) {
        NeoArray.remove(this.fireEventOnItems, elementId);
    }

    // todo open
    makeFullscreen() {
        const screenDetails = this.screenDetails;
        const otherScreen = screenDetails.screens.find(s => !s.isPrimary);

        // console.log('###', otherScreen.availTop);
        // window.open(url, '_blank',
        window.open('', 'about:blank',
            `left=${otherScreen.availLeft},` +
            `top=${otherScreen.availTop},` +
            `width=${otherScreen.availWidth},` +
            `height=${otherScreen.availHeight}`);

        /*
        Fullscreen !!!
        https://web.dev/window-controls-overlay/
        The "window-controls-overlay" value for the "display_override" field in the web app manifest.
        The CSS environment variables titlebar-area-x, titlebar-area-y, titlebar-area-width, and titlebar-area-height.
        The standardization of the previously proprietary CSS property -webkit-app-region as the app-region property to define draggable regions in web content.
        A mechanism to query for and work around the window controls region via the windowControlsOverlay member of window.navigator.
        DEMO
        https://window-controls-overlay.glitch.me/
         */
    }

    windowMap = new Map();

    async windowCreate(data) {
        const windowName = data.name;
        console.log(data.position.height);
        Neo.Main.windowOpen({
            url: `../externalWindow/index.html`,
            windowFeatures: `height=${data.position.height},left=${data.position.left},top=${data.position.top},width=${data.position.width}`,
            windowName
        });

//        Neo.apps.register('t1');

        let newWindow = Neo.Main.openWindows[windowName];

        // let newWindow = window.open('', 'about:blank',
        //     `left=${data.position.left},` +
        //     `top=${data.position.top},` +
        //     `width=${data.position.width},` +
        //     `height=${data.position.height},` +
        //     `directories=0,titlebar=0,toolbar=no,location=no,status=yes,menubar=no,scrollbars=no,resizable=no`
        // );
        //
        // newWindow.document.write("<html><body><p>Dies ist ein neues Fenster mit Quelltext statt URL.</p></body></html>");
        // // newWindow.document.write("<html><head><title>Neues Fenster</title></head><body><p>Dies ist ein neues Fenster mit Quelltext statt URL.</p></body></html>");
        /**
         * We have to get the initial size and keep it, due to
         * resizing problems
         * Other Events in order are focus, resize, blur (on stop dragging)
         */
        newWindow.addEventListener("focus", function () {
            // console.log("Window focus!", newWindow.height, newWindow.innerHeight, newWindow.outerHeight);
            newWindow.keepSize = {width: newWindow.outerWidth, height: newWindow.outerHeight};
        });
        // 1

//        newWindow.name = data.name;
        // register window
        this.windowMap.set(data.name, newWindow);
    }

    /**
     * We have to get the initial size and keep it, due to
     * resizing problems
     */
    windowMove(data) {
        // console.log(data.name)
        let curWindow = this.windowMap.get(data.name);

        if(curWindow.keepSize && document.location.hash !== '#sizing=true')
            curWindow.resizeTo(curWindow.keepSize.width, curWindow.keepSize.height);
        // curWindow.moveTo(data.position.left, data.position.top);
        curWindow.moveTo(data.position.x, data.position.y);
    }

    /**
     * Make the main window smaller
     */
    windowSmaller(data) {
        window.resizeBy(-1 * data.amount, 0);
        if(data.position === 'left') {
            window.moveBy(data.amount, 0);
        }
    }
}

let instance = Neo.applyClassConfig(ScreenDetails);

export default instance;
