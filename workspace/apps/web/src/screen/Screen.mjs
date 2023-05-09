import Base from '../../../../node_modules/neo.mjs/src/core/Base.mjs';
import NeoArray from "../../../../node_modules/neo.mjs/src/util/Array.mjs";

/**
 * Single Screen
 * @class Web.src.screen.Screen
 * @extends Neo.core.Base
 * @singleton
 */
class Screen extends Base {
    static config = {
        /**
         * @member {String} className='Web.src.screen.Screen'
         * @protected
         */
        className: 'Web.src.screen.Screen',


        availHeight: null,
        availLeft: null,
        availTop: null,
        availWidth: null,
        colorDepth: null,
        height: null,
        isExtended: null,
        onchange: null,
        orientation: {
            ScreenOrientation: {
                angle: 0,
                type: 'landscape-primary',
                onchange: null
            }
        },
        pixelDepth: null,
        width: null
    }

}

let instance = Neo.applyClassConfig(Screen);

export default instance;
