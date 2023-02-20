import ButtonBase from '../../../../../node_modules/neo.mjs/src/button/Base.mjs';

/**
 * @class Web.view.src.button.Alert
 * @extends Neo.container.Base
 */
class Alert extends ButtonBase {
    static config = {
        /**
         * @member {String} className='Web.view.src.button.Alert'
         * @protected
         */
        className: 'Web.view.src.button.Alert',

        ui: 'alert',
        text: 'WARNUNG',
        iconCls: ['fa fa-warning'],

        maxHeight: 500
    }
}

Neo.applyClassConfig(Alert);

export default Alert;
