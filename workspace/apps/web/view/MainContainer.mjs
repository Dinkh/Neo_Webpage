import MainContainerModel       from './MainContainerModel.mjs';
import Viewport                 from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';
import Layout                   from "./main/Layout.mjs";
import MainContainerController  from "./MainContainerController.mjs";
import Dashboard                from "./main/Dashboard.mjs";
import Navigation               from "./main/Navigation.mjs";
import Footer                   from "./main/Footer.mjs";
import StatusBar from "./main/StatusBar.mjs";
import Welcome from "./main/Welcome.mjs";


// Import ScreenManager to auto-run
import ScreenManager from "../src/screen/ScreenManager.mjs";

/**
 * @class Web.view.MainContainer
 * @extends Neo.model.Component
 */
class MainContainer extends Viewport {
    static config = {
        /**
         * @member {String} className='Web.view.MainContainer'
         * @protected
         */
        className: 'Web.view.MainContainer',

        controller: MainContainerController,
        model: MainContainerModel,

        cls: ['web-main'],

        layout: {
            ntype: 'vbox',
            align: 'stretch',
        },
        items: [{
            module: Navigation,
            id: 'navigation'
        }, {
            // allow the navigation to jump to the correct place
            ntype: 'component',
            height: 105,
            style: {flex: 'none'}
        }, {
            module: StatusBar
        }, {
            module: Welcome,
            id: 'Welcome',
            bind: {hidden: data => data.isDisplayGranted === 'granted'}
        }, {
            module: Layout,
            id: 'monitor-layout',
        //     bind: {hidden: data => data.isDisplayGranted !== 'granted'}
        }, {
            module: Dashboard,
            id: 'dashboard',
        //     bind: {hidden: data => data.isDisplayGranted !== 'granted'}
        }, {
            module: Footer,
            id: 'footer',
            flex: 1
        }],

        domListeners: {
            scroll: 'onScroll'
        }
    }
}

Neo.applyClassConfig(MainContainer);

export default MainContainer;
