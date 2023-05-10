import Base from '../../../../node_modules/neo.mjs/src/dialog/Base.mjs';
import NeoArray from "../../../../node_modules/neo.mjs/src/util/Array.mjs";
import WindowManager from "../../src/WindowManager.mjs";
import BrowserWindow from "../../src/BrowserWindow.mjs";

/**
 * @class Web.view.items.Dialog
 * @extends Neo.dialog.Base
 */
class Dialog extends Base {
    static config = {
        className: 'Web.view.items.Dialog',
        appName: 'Web',

        title: 'Drag Me',
        iconCls: 'fa fa-home',
        headerConfig: {actions: ['close']},
        resizable: false,
        items: [],
        dragZoneConfig: {alwaysFireDragMove: true},
        // todo remove
        windowStatus: false,
        domListeners: {
            'drag:start': async function (e) {
            },
            'drag:move': function (e) {
                const me = this,
                    browserMousePosition = {x: e.clientX, y: e.clientY},
                    isInsideBrowser = BrowserWindow.isInside(browserMousePosition),
                    hasWindow = me.windowStatus;

                if (isInsideBrowser && hasWindow) {
                    WindowManager.windowClose(e.component.id);
                    me.windowStatus = false;
                    me.dragZone.dragProxy.show();
                } else if (!isInsideBrowser) {
                    if (!hasWindow) {
                        me.dragZone.dragProxy.hide();
                        WindowManager.windowCreate(e);
                        me.windowStatus = true;
                    } else {
                        WindowManager.windowMoveTo(e);
                    }
                }
            },
            'drag:end': function (e) {
                const me = this,
                    hasWindow = me.windowStatus;

                if (hasWindow) {
                    me.hide(false);
                    Web.appConnect_registerDialogId(me.id, 'externalOnly');
                }
            }
        }
    }

    onConstructed() {
        super.onConstructed();

        let me = this;

        Web.appConnect_registerDialogId(me.id);
    }

    close() {
        const me = this,
            dialogContainer = me.items[1],
            comp = dialogContainer.items[0],
            allow = comp.getReference('allow-pop-out'),
            orgParentId = comp.orgParent,
            orgParent = Neo.getComponent(orgParentId);

        comp.orgParent = null;
        comp.removeCls('windowed');
        allow.show();

        dialogContainer.remove(comp, false);

        orgParent.add(comp);

        me.destroy(true);
    }
}

Neo.applyClassConfig(Dialog);

export default Dialog;
