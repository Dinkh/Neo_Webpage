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
                let layoutWorker = this.layoutWorker || {};

                layoutWorker.avail = await Neo.main.addon.ScreenDetails.getBrowserFrame();
                layoutWorker.all = await Neo.main.addon.ScreenDetails.getAllScreensDetails();
                layoutWorker.current = layoutWorker.all.current;
                delete layoutWorker.all.current;

                this.layoutWorker = layoutWorker;
            },
            'drag:move': function (e) {
                let layoutWorker = this.layoutWorker;

                // top
                if(layoutWorker) {
                    const l = layoutWorker.avail,
                        isOutOfBounce = e.clientX < 0 || e.clientY < 0 || e.clientX > l.width || e.clientY > l.height;

                    if (!isOutOfBounce && !this.screenHidden) return;

                    // find out if inside current screen
                    let current = layoutWorker.current,
                        ratio = l.devicePixelRatio / current.devicePixelRatio,
                        headerHeight = (l.outerHeight - (l.height * ratio)),
                        posX = l.left + (e.clientX * ratio) - current.left,
                        posY = l.top + headerHeight + (e.clientY * ratio) - current.top,
                        isInsideCurrent = (posY > 0) && (posY < current.height) && (posX > 0) && (posX < current.width),
                        offsets = {x: (-12 * current.devicePixelRatio), y: (-12 * current.devicePixelRatio)},
                        monitorOffset = {x: 0, y: 0};

                    if (!isInsideCurrent) {
                        const currentMeasure = {x: current.width, y: current.height},
                            topBottom = ['top', 'center', 'bottom'],
                            leftRight = ['left', 'center', 'right'],
                            position = current.position,
                            oldCurrent = current;
                        let monitorRatio = {x: 0, y: 0},
                            currentPositionIndex, newCurrentPostion;

                        // monitorOffset = {
                        //     x: current.left,
                        //     y: current.top - current.height
                        // }

                        if (posY < -10) {
                            // TOP
                            currentPositionIndex = topBottom.indexOf(position);
                            newCurrentPostion = topBottom[currentPositionIndex - 1];
                            current = layoutWorker.all[newCurrentPostion];
                            monitorOffset.x = current.left;
                        } else if (posY > current.height) {
                            // BOTTOM
                            currentPositionIndex = topBottom.indexOf(position);
                            newCurrentPostion = topBottom[currentPositionIndex + 1];
                            current = layoutWorker.all[newCurrentPostion];
                            monitorOffset = {
                                x: current.left,
                                y: current.top - current.height
                            }
                        } else if (posX < -10) {
                            // LEFT
                            current = layoutWorker.all.left;
                            monitorOffset.y = current.top;
                        } else if (posX > current.width) {
                            // RIGHT
                            current = layoutWorker.all.right;
                            monitorOffset = {
                                x: current.left - current.width,
                                y: current.top
                            }
                        }

                        monitorRatio = {x: currentMeasure.x / current.width, y: currentMeasure.y / current.height};
                        ratio = l.devicePixelRatio / current.devicePixelRatio;
                      //  offsets = {x: (12 * monitorRatio.x), y: (12 * monitorRatio.y)};
                    }

                    // calc window values
                    let vdom = this.vdom,
                        extWindow = 't1';

                    const left =  (e.clientX * ratio) + l.left + offsets.x + monitorOffset.x,
                        top = (e.clientY * ratio) + l.top + headerHeight + offsets.y + monitorOffset.y;

                    if(!this.screenHidden) {
                        this.screenHidden = true;

                        Neo.main.addon.ScreenDetails.windowCreate({
                            name: extWindow,
                            position: {
                                left: left,
                                top: top,
                                width: 500,
                                height: 150
                            }
                        });

                        vdom.cn[0].cls.push('neo-hidden');
                    } else {
                        Neo.main.addon.ScreenDetails.windowMove({
                            name: extWindow,
                            position: {
                                left: left,
                                top: top
                            }
                        })
                    }
                    // } else if(this.screenHidden) {
                    //     console.log(e);
                    //     this.screenHidden = false;
                    //
                    //     NeoArray.remove(vdom.cn[0].cls, 'neo-hidden');
                    //     this.dragZone.dragProxy.hidden = false;
                    //
                    // }

                    this.vdom = vdom;

                    this.update(false);
                }
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
        dialogContainer.update();

        orgParent.add(comp);

        Neo.timeout(150).then(() => {

            me.destroy(true);
        });
    }
}

Neo.applyClassConfig(Dialog);

export default Dialog;
