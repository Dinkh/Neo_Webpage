import Component from '../../../node_modules/neo.mjs/src/controller/Component.mjs';
import ItemsDialog   from './items/Dialog.mjs';

/**
 * @class Web.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends Component {
    static config = {
        className: 'Web.view.MainContainerController'
    }

    async onConstructed() {
        super.onConstructed();

        let me = this;

        this.checkMultiScreen();
        this.checkPWA();
        this.checkPermission();

// debugger;
//         Neo.currentWorker.on({
//             connect   : me.onAppConnect,
// //            disconnect: me.onAppDisconnect,
//             scope     : me
//         });
//
// //        me.component.on('mounted', me.onMainViewMounted, me);
    }

    async checkMultiScreen() {
        const isMultiScreen = await Neo.main.addon.ScreenDetails.isMultiScreen();

        this.getModel().setData({isMultiScreen: isMultiScreen ? 'granted' : 'denied'});
    }

    async checkPWA() {
        const me = this,
            isPWA = await Neo.main.addon.ScreenDetails.isPWA();

        me.getModel().setData({isPWA: isPWA ? 'granted' : 'denied'});

        if(isPWA) {
            Neo.main.addon.ScreenDetails.setStartingPosition();
        }

        // todo update ViewModel when app installed
        // me.on('appinstalled', () => {
        //     me.getModel().setData({isPWA: true});
        // })
    }

    async checkPermission() {
        const me = this,
            permissionState = await Neo.main.addon.ScreenDetails.getPermissionStatus();

        me.getModel().setData({isDisplayGranted: permissionState});
    }

    /**
     * Scrolling the main view should handle NavBar height and transparency
     * @param {Event} data
     */
    onScroll(data) {
        const scrollPos = data.target.scrollTop,
            comp = Neo.getComponent('navigation').up(),
            vm = this.getModel(),
            isSmall = vm.getData('navigationIsSmall');

        // Remove the route from previous navigation-bar clicks
        Neo.Main.setRoute({value:''});
        // Add or Remove cls to enlarge or shrink the navigation-bar
        if(scrollPos > 100 && !isSmall) {
            comp.addCls('small')
            vm.setData({navigationIsSmall: true});
        } else if(scrollPos < 100 && isSmall) {
            comp.removeCls('small')
            vm.setData({navigationIsSmall: false});
        }
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     */
    onAppConnect(data) {
        debugger;
        let me = this,
            name = data.appName,
            model = me.getModel(),
            item;

        console.log('%c[i]%c onAppConnect ' + name, 'background-color: teal; color: white', '');

        switch (name) {
            case 'ColorPicker':
                item = this.colorPicker;
                break;
            case 'MeasureTool':
                item = this.measureTool;
                break;
        }

        if(item) {
            NeoArray.add(me.connectedApps, name);

            Neo.apps[name].on('render', () => {
                setTimeout(() => {
                    item.parent.remove(item.view, false);
//                    me.#getMainView(name).add(item.view);

                    console.log(item.view);

                    model.setData('selectedColor', model.getData('selectedColor'));

                }, 100);
            });

        }
    }
}

Neo.applyClassConfig(MainContainerController);

export default MainContainerController;
