import DataTile            from "../items/DataTile.mjs";
import EmptyTile           from "../items/EmptyTile.mjs";
import Section             from "../items/Section.mjs";

import DashboardController from './DashboardController.mjs';
import AddNew              from "./AddNew.mjs";

/**
 * @class Web.view.main.Dashboard
 * @extends Web.items.Section
 */
class Dashboard extends Section {
    static config = {
        className: 'Web.view.main.Dashboard',
        ntype: 'web-dashboard',

        controller: DashboardController,

        cls: [ 'data-container' ],

        items: [{
            ntype: 'component',
            vdom: {cn: [
                { tag: 'h1', innerHTML: 'Dashboard', style: {textAlign: 'center'} },
                { tag: 'h2', innerHTML: 'you can use Neo.MJS like you use Graphana', style: {textAlign: 'center'} },
                { style: {paddingBottom: '3rem'},  innerHTML: 'Klick an item to remove it to a dialog. Then move it out of the current screen to remove the dialog and use it as an external window.' }
            ]}
        }, {
            ntype: 'container',
            reference: 'data-content',
            cls: [ 'data-content' ],
            layout: { ntype: 'hbox',wrap: 'wrap' },
            items: [{
                module: EmptyTile,
                domListeners: { click: 'onEmptyTileClick' }
            }, {
                module: DataTile
            }]
        }, {
            module: AddNew,
            reference: 'add-new',
            hidden: true
        }]
    }
}

Neo.applyClassConfig(Dashboard);

export default Dashboard;
