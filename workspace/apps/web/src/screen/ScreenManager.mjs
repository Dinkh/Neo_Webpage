import Base     from '../../../../node_modules/neo.mjs/src/manager/Base.mjs';
import NeoArray from "../../../../node_modules/neo.mjs/src/util/Array.mjs";

// auto create
import BrowserWindow from "./BrowserWindow.mjs";

/**
 * Screen Manager
 * @class Web.src.screen.ScreenManager
 * @extends Neo.manager.Base
 * @singleton
 */
class ScreenManager extends Base {
    static config = {
        /**
         * @member {String} className='Web.src.screen.ScreenManager'
         * @protected
         */
        className: 'Web.src.screen.ScreenManager',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,

        askedForPermission: false,
        hasPermission: null
    }

    screens = []
    mainBrowserScreen = null
    mouseOverScreen = null

    /**
     * @param {Object} config
     */
    async construct(config) {
        super.construct(config);
//        await this.dragStart();
    }

    async dragStart (e) {
        await this.setScreens();
        await this.setMainBrowserScreen();
    }

    async setScreens() {
        await this.askForPermission();
        const screens = await Neo.main.addon.ScreenDetails.getAllScreens();

        this.screens = screens;
    }

    async setMainBrowserScreen() {
        this.mainBrowserScreen = await Neo.main.addon.ScreenDetails.getWindowScreen();
    }

    setMouseOverScreen(mousePosition) {
        this.mouseOverScreen = this.getScreenIdAtPosition(mousePosition)
    }

    /**
     * HELPER - get the screen which is at Position
     *
     * @param {Object} position
     * @returns {*}
     */
    getScreenIdAtPosition(position) {
        return;

        // todo calc the real position on the screen from the mouse position
        const screens = this.screens;

        for(let screenId in screens) {
            console.log(screenId)
            const screen = screens[screenId];

            if(position.x >= screen.top && position.y >= screen.left
                && position.x <= (screen.left+screen.width) && position.y <= (screen.top+screen.height)) {
                console.log(screenId);
                return screen;
            }
        }
        console.log('---nothing---', position)
    }

    /**
     * HELPER - MousePos and browserWindow.innerHeight have to be recalculated
     * @param {Number} pos
     * @param {Object} screen  You can pass a screen otherwise the screen of the mouse
     * @returns {number}
     */
    calcPos(pos, screen) {
        if(!screen) return;

        const browserDPI = Web.src.screen.BrowserWindow.devicePixelRatio,
            screenDPI = screen.devicePixelRatio;

        return pos * browserDPI / screenDPI;
    }

    calcDimension(pos) {
        const browserDPI = Web.src.screen.BrowserWindow.devicePixelRatio,
            screenDPI = 2.5;

        return pos * browserDPI / screenDPI;
    }

    async askForPermission() {
        if(!this.askedForPermission) {
            this.hasPermission = await Neo.main.addon.ScreenDetails.askForPermission();
            this.askedForPermission  = true;
        }

        if(!this.hasPermission) console.log('WARNING : NO PERMISSIONS GRANTED');
    }
}

let instance = Neo.applyClassConfig(ScreenManager);

export default instance;
