import Component from '../../../node_modules/neo.mjs/src/controller/Component.mjs';
import AppConnect from "../src/mixin/AppConnect.mjs";
// uses
import ItemsDialog   from './items/Dialog.mjs';

/**
 * @class Web.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends Component {
    static config = {
        className: 'Web.view.MainContainerController',

        /**
         * @member {Array} mixins=[DeltaUpdates, Observable]
         */
        mixins: [
            AppConnect
        ],
    }

    async onConstructed() {
        super.onConstructed();

        let me = this;

        this.checkMultiScreen();
        this.checkPWA();
        this.checkPermission();

        this.ac_constructor();
    }

    async checkMultiScreen() {
        const isMultiScreen = await Neo.main.addon.ScreenDetails.isMultiScreen();

        this.getModel().setData({isMultiScreen: isMultiScreen ? 'granted' : 'denied'});
    }

    async checkPWA() {
        const me = this,
            isPWA = await Neo.main.addon.PWA.isPWA();

        me.getModel().setData({isPWA: isPWA ? 'granted' : 'pendend'});

        if (isPWA) {
            Neo.main.addon.PWA.applyStartingPosition();
        } else {
            // todo Tobi => globaler Event listener
            // Neo.global.fire('appinstalled')
            // Neo.global.on();
            // Neo.on('appinstalled')
            // Neo.main.addon.PWA.registerAppInstalledEventListener(me.id);
            // me.addDomListeners({
            //     appinstalled: me.changeAppInstalledFn
            // });
        }

        // me.addDomListeners('appinstalled', () => {
        //     debugger;
        //     me.getModel().setData({isPWA: true});
        // })

        // todo update ViewModel when app installed
        // me.on('appinstalled', () => {
        //     me.getModel().setData({isPWA: true});
        // })
    }

    changeAppInstalledFn() {
        debugger;
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
}

Neo.applyClassConfig(MainContainerController);

export default MainContainerController;
