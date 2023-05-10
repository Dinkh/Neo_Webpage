import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';
import NeoArray from "../../../node_modules/neo.mjs/src/util/Array.mjs";

/**
 * Basic Read Multi-Monitor Data and return Details
 * @class Neo.main.addon.ScreenDetails
 * @extends Neo.core.Base
 * @singleton
 */
class ScreenDetails extends Base {
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
                'isMultiScreen',
                'getPermissionStatus'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    /**
     * This pops up a hint for the user to allow Permission for window-management
     *
     * @returns {String}
     */
    async askForPermission() {
        let state;

        await window.getScreenDetails()
            .then(() => {state  = 'granted';})
            .catch(() => {state = 'denied';})

        return state;
    }

    /**
     * Checks if the user has multiple screens available.
     * No permission necessary
     *
     * @returns {Boolean}
     */
    isMultiScreen() {
        return window.screen.isExtended;
    }

    /**
     * We need to know if the user has previously denied access to window-management
     *
     * @returns {Promise<boolean>}
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
}

let instance = Neo.applyClassConfig(ScreenDetails);

export default instance;
