import Component from '../../../../node_modules/neo.mjs/src/controller/Component.mjs';
import Toast     from '../../../../node_modules/neo.mjs/src/component/Toast.mjs';

/**
 * @class Web.view.main.DashboardController
 * @extends Neo.controller.Component
 */
class DashboardController extends Component {
    static config = {
        className: 'Web.view.main.DashboardController'
    }

    /**
     * Add a new Tile and Hide data-entry part
     */
    async onAddNewClick() {
        const me = this,
            dashboard = me.component,
            form = dashboard.getReference('add-new'),
            isValid = form.validate();

        if(isValid) {
            const dataContent = dashboard.getReference('data-content'),
                data = form.getValues();

            if(!data.type) data.type = 'webSocket';

            dataContent.add({
                ntype: 'data-tile',
                source: data.source,
                connectionType: data.type
            })
        } else {
            Neo.toast({
                appName: dashboard.appName,
                ui: 'danger',
                closable: true,
                msg: 'Missing Source.<br>Reopen to try again',
                iconCls: 'fa-solid fa-circle-exclamation'
            })
        }


        form.hide();
        await Neo.timeout(50);
        dashboard.fire('sectionToggleHelp', true);
        // todo add help again
    }

    /**
     * Currently radio-fields do not report the correct value
     * to the form. This is a workaround.
     * @param {Event} data
     */
    onChangeDataType(data) {
        if(!data.value) return;

        const form = this.component.getReference('add-new'),
            value = data.component.valueLabelText;

        form.setValues({type: value});
    }

    /**
     * Show the data-entry part for new Data-Tiles
     */
    onEmptyTileClick() {
        const dashboard = this.component,
            addNew = dashboard.getReference('add-new');

        dashboard.fire('sectionToggleHelp', false);
        addNew.hidden = false;
    }
}

Neo.applyClassConfig(DashboardController);

export default DashboardController;
