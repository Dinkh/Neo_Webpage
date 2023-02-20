import Viewport                 from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';
import Container                from '../../../node_modules/neo.mjs/src/container/Base.mjs';
import Button                   from '../../../node_modules/neo.mjs/src/button/Base.mjs';
import Layout                   from "./main/Layout.mjs";
import MainContainerController  from "./MainContainerController.mjs";
import Dashboard                from "./main/Dashboard.mjs";
import Navigation               from "./main/Navigation.mjs";
import Footer                   from "./main/Footer.mjs";
import AddNew from "./main/AddNew.mjs";
import Section from "./items/Section.mjs";

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

        cls: ['web-main'],

        layout: {
            ntype: 'vbox',
            align: 'stretch'
        },
        items: [{
            module: Navigation,
            id: 'navigation'
        }, {
            // allow the navigation to jump to the correct place
            ntype: 'component',
            height: 100,
            style: {flex: 'none'}
        }, {
            module: Layout,
            id: 'monitor-layout'
        }, {
            module: Dashboard,
            id: 'dashboard'
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
