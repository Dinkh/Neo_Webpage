import Form       from '../../../../node_modules/neo.mjs/src/form/Container.mjs';
import TextField  from '../../../../node_modules/neo.mjs/src/form/field/Text.mjs';
import RadioField from "../../../../node_modules/neo.mjs/src/form/field/Radio.mjs";

/**
 * @class Web.view.main.AddNew
 * @extends Neo.container.Base
 */
class AddNew extends Form {
    static config = {
        className: 'Web.view.main.AddNew',
        ntype: 'web-add-new',

        reference: 'add-new',

        cls: ['add-new'],

        layout: 'hbox',
        items: [{
            ntype: 'container',
            cls: ['add-new-fields'],
            flex: 1,
            items: [{
                module: TextField,
                name: 'source',
                labelText: 'Source-Url',
                required: true
            }, {
                module: RadioField,
                name: 'type',
                checked: true,
                labelText: 'WebSocket',
                hideValueLabel: true,
                valueLabelText: 'webSocket',
                listeners     : {change: 'onChangeDataType'}
            }, {
                module: RadioField,
                name: 'type',
                disabled: true,
                labelText: 'Ajax Call',
                hideValueLabel: true,
                valueLabelText: 'ajaxCall',
                listeners     : {change: 'onChangeDataType'}
            }]
        }, {
            ntype: 'button',
            useRippleEffect: false,
            iconCls: 'fa fa-plus',
            width: 150,
            handler: 'onAddNewClick'
        }]
    }
}

Neo.applyClassConfig(AddNew);

export default AddNew;
