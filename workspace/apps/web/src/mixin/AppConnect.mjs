import Base from '../../../../node_modules/neo.mjs/src/core/Base.mjs';
import NeoArray from "../../../../node_modules/neo.mjs/src/util/Array.mjs";
import Logger from '../Logger.mjs'
/**
 * Logic to apply app connection
 * @class Web.src.mixin.AppConnect
 * @extends Neo.core.Base
 * @singleton
 */
class AppConnect extends Base {
    static config = {
        /**
         * @member {String} className='Web.src.mixin.AppConnect'
         * @protected
         */
        className: 'Web.src.mixin.AppConnect',

        connectedApps: [],
        dialogIds: new Map()
    }

    /**
     * @param {Object} delta
     * @param {String} delta.id
     */
    ac_constructor() {
        const me = this;

        Neo.currentWorker.on({
            connect   : me.ac_onAppConnect,
            disconnect: me.ac_onAppDisconnect,
            scope     : me
        });

        Web.appConnect_registerDialogId = me.ac_registerItem.bind(me);
        Web.appConnect_unregisterDialogId = me.ac_unregisterItem.bind(me);
    }

    ac_registerItem(dialogId, value) {
        value = value || 'internal';

        this.dialogIds.set(dialogId, value);
        // NeoArray.add(this.dialogIds, dialogId);
    }

    ac_unregisterItem(dialogId) {
        this.dialogIds.delete(dialogId);
        //NeoArray.remove(this.dialogIds, dialogId);
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     */
    ac_onAppConnect(data) {
        let me = this,
            appName = data.appName,
            dialog, dataTile;

        if(appName === 'Web') return;

        Logger.log(`onAppConnect ${appName}`)

        dialog = Neo.get(appName);
        dataTile = dialog.items[1].items[0];

        NeoArray.add(me.connectedApps, appName);

        Neo.apps[appName].on('render', () => {
            setTimeout(() => {
                const futureContainer = me.ac_getMainView(appName);

                dataTile.up().remove(dataTile, false);
                futureContainer.add(dataTile);
            }, 100);
        });
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     */
    ac_onAppDisconnect(data) {
        let me = this,
            appName = data.appName,
            appParentView = me.ac_getMainView(appName),
            dialog, dataTile, futureContainer;

        Logger.log(`onAppDisconnect ${appName}`)

        // Closing the main app
        if(appName === 'Web') {
            Neo.Main.windowClose({
                names: me.connectedApps,
            });
            return;
        }

        // Closing a window
        dialog = Neo.get(appName);
        futureContainer = dialog.items[1];
        dataTile = appParentView.items[0];


        if(dataTile) {
            if(this.dialogIds.get(appName) === 'externalOnly') {
                dialog.show();
            }
            this.dialogIds.set(appName, 'internal');

            appParentView.remove(dataTile, false);
            futureContainer.add(dataTile);

            //futureContainer.mount();

            NeoArray.remove(me.connectedApps, appName);
            Neo.apps[appName].destroy();
        }
    }
    /**
     * @param {String} [appName]
     * @returns {Neo.component.Base}
     */
    ac_getMainView(appName) {
        if (!appName || appName === 'Web') {
            return this.component;
        }

        return Neo.apps[appName].mainView;
    }

}

Neo.applyClassConfig(AppConnect);

export default AppConnect;
