import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';
import NeoArray from "../../../node_modules/neo.mjs/src/util/Array.mjs";

/**
 * Native Support for PWA
 * @class Neo.main.addon.PWA
 * @extends Neo.core.Base
 * @singleton
 */
class PWA extends Base {
    /**
     * Id for components listening to event 'appinstalled'
      * @type {[]}
     */
    listenerIds = [];
    /**
     * Initial position of the screen
     * @type {number[]}
     */
    pwaPosition = [0,5]
    /**
     * Initial offset to the screen size
      * @type {{w: number, h: number}}
     */
    pwaSizeOffset = {w: 235, h: 5}

    static config = {
        /**
         * @member {String} className='Neo.main.addon.PWA'
         * @protected
         */
        className: 'Neo.main.addon.PWA',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'applyStartingPosition',
                'isPWA',
                'registerAppInstalledEventListener',
                'unregisterAppInstalledEventListener'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    /**
     * When launched as PWA, preset the window screen size and position
     */
    applyStartingPosition() {
        const me = this,
            screen = window.screen,
            pwaWidth = screen.availWidth - me.pwaSizeOffset.w,
            pwaHeight = screen.availHeight - me.pwaSizeOffset.h;

        window.resizeTo(pwaWidth,pwaHeight);
        window.moveTo(...this.pwaPosition);
    }

    /**
     * Check if currently running as PWA, if not
     * set listener to wait until installed
     *
     * Standard desktop display mode is 'browser'
     * Standard pwa display mode is 'standalone'
     *
     * @returns {boolean}
     */
    isPWA() {
        const mqStandAlone = '(display-mode: standalone)';
        let isPWA = false;

        if(navigator.standalone || window.matchMedia(mqStandAlone).matches) {
            isPWA = true;
        }

        if(!isPWA) {
            this.listener_appinstalled();
        }

        return isPWA;
    }

    /**
     * ------------------ EVENT ------------------
     * todo Tobi => neues Ticket für event listener der im Controller geholt werden kann.
     */

    /**
     * Register event to fire the 'appinstalled'
     * @param elementId
     */
    registerAppInstalledEventListener(elementId) {
        NeoArray.add(this.listenerIds, elementId);
    }

    /**
     * Unregister event to fire the 'appinstalled'
     * @param elementId
     */
    unregisterAppInstalledEventListener(elementId) {
        NeoArray.remove(this.listenerIds, elementId);
    }

    listener_appinstalled() {
        const me = this;

        window.addEventListener('appinstalled', async (event) => {
            const listenerIds = me.listenerIds;

            for (const itemId in listenerIds) {
                const id = listenerIds[itemId];

                Neo.main.DomEvents.sendMessageToApp({
                    id: id,
                    path: [{cls: [], id: id}],

                    type: 'appinstalled',
                    value: true
                });
            }
        });
    }
}

let instance = Neo.applyClassConfig(PWA);

export default instance;
