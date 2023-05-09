import Base                from '../../../../node_modules/neo.mjs/src/container/Base.mjs';
import Button           from '../../../../node_modules/neo.mjs/src/button/Base.mjs';
import Container           from '../../../../node_modules/neo.mjs/src/container/Base.mjs';
import StatusBarController from './StatusBarController.mjs';

/**
 * @class Web.view.main.StatusBar
 * @extends Neo.container.Base
 */
class StatusBar extends Base {
    static config = {
        className: 'Web.view.main.StatusBar',
        ntype: 'web-statusbar',

        controller: StatusBarController,

        cls: ['web-status-bar'],
        items: [{
            ntype: 'button',
            text: 'Freigabe',
            iconCls: 'icon-permission',
            bind: {
                ui: data => data.isDisplayGranted,
                displaySmall: data => data.navigationIsSmall,
                disabled: data => data.isDisplayGranted === 'granted' || data.isDisplayGranted === 'denied'
            },
             handler: 'onPermissionClick'
        },{
            ntype: 'button',
            text: 'Run as PWA',
            iconCls: 'icon-pwa',
            disabled: true,
            bind: {
                ui: data => data.isPWA,
                displaySmall: data => data.navigationIsSmall
            }
        },{
            ntype: 'button',
            text: 'Multi Screen',
            iconCls: 'icon-multiscreen',
            disabled: true,
            bind: {
                ui: data => data.isMultiScreen,
                displaySmall: data => data.navigationIsSmall
            }
        }]
    }
}

Neo.applyClassConfig(StatusBar);

export default StatusBar;
