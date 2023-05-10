import Base from '../../../node_modules/neo.mjs/src/manager/Base.mjs';

/**
 * Window Manager
 * @class Web.src.WindowManager
 * @extends Neo.manager.Base
 * @singleton
 */
class WindowManager extends Base {
    static config = {
        /**
         * @member {String} className='Web.src.WindowManager'
         * @protected
         */
        className: 'Web.src.WindowManager',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    windowMap = new Map();
    windowPwaSizeOffset = {
        w: 3,
        h: -2
    };
    windowSizeOffset = {
        w: 3,
        h: 26
    };
    windowOffset = {
        x: -120,
        y: -15
    };

    async windowCreate(e) {
        const me = this,
            isPWA = await Neo.main.addon.PWA.isPWA(),
            sizeOffset = isPWA ? me.windowPwaSizeOffset : me.windowSizeOffset,
            offset = me.windowOffset,

            comp = e.component,
            windowName = comp.id,

            x = e.screenX + offset.x,
            y = e.screenY + offset.y,
            width = comp.width + sizeOffset.w,
            height = comp.height + sizeOffset.h;

        // Set the AppName, which is used during window creation
        Neo.newAppName = windowName;
        // Create new Window
        Neo.Main.windowOpen({
            url: `../externalWindow/index.html`,
            windowFeatures: `height=${height},left=${x},top=${y},width=${width}`,
            windowName
        });

        // register window
        me.windowMap.set(windowName, {
            size: {w: width, h: height}
        });
    }

    windowMoveTo(e) {
        const me = this,
            windowName = e.component.id,
            win = me.windowMap.get(windowName);

        if (!win) return;

        const offset = me.windowOffset,
            x = e.screenX + offset.x,
            y = e.screenY + offset.y,
            height = win.size.h,
            width = win.size.w;

        Neo.Main.windowResizeTo({windowName, height, width});
        Neo.Main.windowMoveTo({windowName, x, y});
    }

    windowClose(windowName) {
        const me = this,
            win = me.windowMap.get(windowName);

        if (!win) return;

        Neo.Main.windowClose({names: [windowName]});
        me.windowMap.delete(windowName)
    }
}

let instance = Neo.applyClassConfig(WindowManager);

export default instance;
