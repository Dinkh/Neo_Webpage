import Component from '../../../node_modules/neo.mjs/src/model/Component.mjs';

/**
 * @class Web.view.MainContainerModel
 * @extends Neo.model.Component
 */
class MainContainerModel extends Component {
    static config = {
        /**
         * @member {String} className='Web.view.MainContainerModel'
         * @protected
         */
        className: 'Web.view.MainContainerModel',
        /**
         * @member {Object} data
         */
        data: {
            isPWA: null,
            isDisplayGranted: null,
            isMultiScreen: null,
            navigationIsSmall: false
        }
    }
}

Neo.applyClassConfig(MainContainerModel);

export default MainContainerModel;
