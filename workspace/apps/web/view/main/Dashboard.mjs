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
        help: '<i>click</i> and <i>drag&drop</i> a tile to another Screen. The connection does not get lost.<br><br>' +
            'You can <i>add</i> a new WebSocket connection using the + button<br><br>' +
            'The first connection is linked to <span class="link">https://www.piesocket.com/websocket-tester</span><br>' +
            'You can <i>click</i> this button to <i>copy</i> the link to the clipboard,<br>' +
            'visit the page, click connect and send messages to the websocket.<br>',

        items: [{
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
            hideMode: 'visibility'
        }]
    }

    construct(config) {
        super.construct(config);

        this.addDomListeners({
            click: {
                fn      : this.onHelpIconClick,
                delegate: '.neo-section-help-icon',
            }
        });

        this.items[1].hidden = true;
    }

    onHelpIconClick() {
        Neo.main.addon.Navigator.clipboard({
            value: 'https://www.piesocket.com/websocket-tester'
        });
    }
}

Neo.applyClassConfig(Dashboard);

export default Dashboard;
