import Component from '../../../../node_modules/neo.mjs/src/controller/Component.mjs';
import ScreenManager from "../../src/screen/ScreenManager.mjs";

/**
 * @class Web.view.main.StatusBarController
 * @extends Neo.controller.Component
 */
class StatusBarController extends Component {
    static config = {
        /**
         * @member {String} className='Web.view.main.StatusBarController'
         * @protected
         */
        className: 'Web.view.main.StatusBarController'
    }

    async onPermissionClick () {
        const me = this,
            vm = me.getModel(),
            hasMultipleScreens = vm.getData('isMultiScreen'),
            permission = vm.getData('isDisplayGranted');
        let result;

        if(permission === 'granted') {
            console.log('[StatusBarController::onPermissionClick] granted');
            return;
        }
        if(permission === 'denied') {
            console.log('[StatusBarController::onPermissionClick] denied');
            return;
        }
        if(hasMultipleScreens !== 'granted') {
            console.log('[StatusBarController::onPermissionClick] Single Screen only');
            return;
        }

        result = await Neo.main.addon.ScreenDetails.askForPermission();

        me.getModel().setData('isDisplayGranted', result);
    }
}

Neo.applyClassConfig(StatusBarController);

export default StatusBarController;
