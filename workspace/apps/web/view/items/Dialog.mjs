import Base from '../../../../node_modules/neo.mjs/src/dialog/Base.mjs';
import NeoArray from "../../../../node_modules/neo.mjs/src/util/Array.mjs";

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
        domListeners: {
            'drag:start': async function (e) {

                const offsetNeoWidth = 12,
                    offsetNeoHeight = 27,
                    screenManager = Web.src.screen.ScreenManager,
                    newWindowWidth = screenManager.calcDimension(e.component.width),
                    newWindowHeight = screenManager.calcDimension(e.component.height);

                screenManager.dragStart(e);
                Neo.main.addon.ScreenDetails.windowCreate({
                    name: 't1',
                    position: {
                        left: e.screenX,
                        top: e.screenY,
                        width: e.component.width + offsetNeoWidth,
                        height: e.component.height + offsetNeoHeight
                    }
                });
            },
            'drag:move': function (e) {
                const screenOffsetX = -150,
                    screenOffsetY = -15;

                Neo.main.addon.ScreenDetails.windowMove({
                    name: 't1',
                    position: {
                        x: e.screenX + screenOffsetX,
                        y: e.screenY + screenOffsetY
                    }
                })
            }
        }
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
