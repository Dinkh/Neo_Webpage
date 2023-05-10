import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';

/**
 * Main Browser Window
 * @class Web.src.BrowserWindow
 * @extends Neo.core.Base
 * @singleton
 */
class BrowserWindow extends Base {
    static config = {
        /**
         * @member {String} className='Web.src.BrowserWindow'
         * @protected
         */
        className: 'Web.src.BrowserWindow',
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

        this.updateBrowserFrame();
    }

    async updateBrowserFrame() {
        const frame = await Neo.Main.getWindowData();

        this.top = frame.screenTop;
        this.left = frame.screenLeft;
        this.width = frame.innerWidth;
        this.height = frame.innerHeight;
        this.outerHeight = frame.outerHeight;
    }

    isInside(mousePosition) {
        return mousePosition.x > 0 && mousePosition.y > 0
            && mousePosition.x < this.width && mousePosition.y < this.height;
    }
}

let instance = Neo.applyClassConfig(BrowserWindow);

export default instance;
