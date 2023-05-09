import Base from '../../../../node_modules/neo.mjs/src/core/Base.mjs';

/**
 * Main Browser Window
 * @class Web.src.screen.BrowserWindow
 * @extends Neo.core.Base
 * @singleton
 */
class BrowserWindow extends Base {
    static config = {
        /**
         * @member {String} className='Web.src.screen.BrowserWindow'
         * @protected
         */
        className: 'Web.src.screen.BrowserWindow',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,

        top: null,              //window.screenTop,
        right: null,            //window.outerWidth,
        left: null,             //window.screenLeft,
        bottom: null,           //window.outerHeight,
        width: null,            //window.innerWidth,
        height: null,           //window.innerHeight,
        outerHeight: null,      //window.outerHeight,
        devicePixelRatio: null, //window.devicePixelRatio
    }

    onConstructed() {
        super.onConstructed();

        let me = this;

        me.updateBrowserFrame();
        // me.component.on('mounted', me.onMainViewMounted, me);
    }

    async updateBrowserFrame() {
        const frame = await Neo.main.addon.ScreenDetails.getBrowserFrame();

        this.top = frame.top;
        this.right = frame.right;
        this.left = frame.left;
        this.bottom = frame.bottom;
        this.width = frame.width;
        this.height = frame.height;
        this.outerHeight = frame.outerHeight;
        this.devicePixelRatio = frame.devicePixelRatio;
    }

    isInside(mousePosition) {
        return mousePosition.x > 0 || mousePosition.y > 0
            || mousePosition.x < this.width || mousePosition.y < this.height;
    }
}

let instance = Neo.applyClassConfig(BrowserWindow);

export default instance;
