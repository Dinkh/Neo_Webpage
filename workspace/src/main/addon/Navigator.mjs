import Base     from '../../../node_modules/neo.mjs/src/core/Base.mjs';

/**
 * Add Navigator functionality, which cannot be used in workers
 *
 * @class Neo.main.addon.Navigator
 * @extends Neo.core.Base
 * @singleton
 */
class Navigator extends Base {
    static config = {
        /**
         * @member {String} className='Neo.main.addon.Navigator'
         * @protected
         */
        className: 'Neo.main.addon.Navigator',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'clipboard'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    /**
     * Add data.value to the clipboard
     */
    clipboard(data) {
        const type = "text/plain",
            blob = new Blob([data.value], { type }),
            clipboardItem = [new ClipboardItem({ [type]: blob })];

        const clipboard =  navigator.clipboard;

        clipboard.write(clipboardItem);
    }
}

let instance = Neo.applyClassConfig(Navigator);

export default instance;
