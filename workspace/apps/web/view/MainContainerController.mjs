import Component from '../../../node_modules/neo.mjs/src/controller/Component.mjs';
import ItemsDialog   from './items/Dialog.mjs';

/**
 * @class Web.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends Component {
    /**
     * Flag to keep track if Navigation-Bar is has cls `small`
     * Used in `onScroll`
     * @type {boolean}
     */
    navigationIsSmall = false


    static config = {
        className: 'Web.view.MainContainerController'
    }

    /**
     * Scrolling the main view should handle NavBar height and transparency
     * @param {Event} data
     */
    onScroll(data) {
        const scrollPos = data.target.scrollTop,
            comp = Neo.getComponent('navigation');

        // Remove the route from previous navigation-bar clicks
        Neo.Main.setRoute({value:''});
        // Add or Remove cls to enlarge or shrink the navigation-bar
        if(scrollPos > 100 && !this.navigationIsSmall) {
            comp.addCls('small')
            this.navigationIsSmall = true;
        } else if(scrollPos < 100 && this.navigationIsSmall) {
            comp.removeCls('small')
            this.navigationIsSmall = false;
        }
    }
}

Neo.applyClassConfig(MainContainerController);

export default MainContainerController;
