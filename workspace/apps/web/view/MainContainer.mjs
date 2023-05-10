import Viewport                 from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';
// ViewModel und ViewController
import MainContainerModel       from './MainContainerModel.mjs';
import MainContainerController  from "./MainContainerController.mjs";
// SubViews
import Dashboard                from "./main/Dashboard.mjs";
import Instruction from "./main/Instruction.mjs";
import Navigation               from "./main/Navigation.mjs";
import StatusBar                from "./main/StatusBar.mjs";
import ResetInstructions        from "./main/ResetInstructions.mjs";
import Welcome                  from "./main/Welcome.mjs";

import Footer                   from "./main/Footer.mjs";
// Import ScreenManager to auto-run
import ScreenManager from "../src/screen/ScreenManager.mjs";

/**
 * @class Web.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static config = {
        /**
         * @member {String} className='Web.view.MainContainer'
         * @protected
         */
        className: 'Web.view.MainContainer',
        // ViewModel und ViewController
        controller: MainContainerController,
        model: MainContainerModel,
        // Styling
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
            ntype: 'component', height: 105, style: {flex: 'none'}
        }, {
            module: StatusBar
        }, {
            // todo error => Tobi #4115
            module: Welcome,
            bind: {hidden: data => data.isDisplayGranted !== 'prompt'}
        }, {
            module: ResetInstructions,
            bind: {hidden: data => data.isDisplayGranted !== 'denied'}
        }, {
            module: Instruction,
            bind: {hidden: data => data.isDisplayGranted !== 'granted'}
        // }, {
        //     module: Layout,
        //     bind: {hidden: data => data.isDisplayGranted !== 'granted'}
        }, {
            module: Dashboard,
            bind: {hidden: data => data.isDisplayGranted !== 'granted'}
        }, {
            module: Footer,
            flex: 1
        }],

        domListeners: {
            scroll: 'onScroll'
        }
    }
}

Neo.applyClassConfig(MainContainer);

export default MainContainer;
