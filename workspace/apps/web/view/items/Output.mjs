import Base             from '../../../../node_modules/neo.mjs/src/component/Base.mjs';

/**
 * @class Web.view.items.Output
 * @extends Neo.component.Base
 */
class Output extends Base {
    static config = {
        /**
         * @member {String} className='Web.view.items.Output'
         * @protected
         */
        className: 'Web.view.items.Output',

        noMonitore: 0,

        vdom: [{
            cn: [{
                cls: 'windows'
            }]
        }]
    }

    construct(config = {}) {
        super.construct(config);
//        Neo.main.addon.ScreenDetails.makeFullscreen()
        // let monitorDetails = Neo.main.addon.ScreenDetails.getMonitorDetails('all').then(details => {
        //     debugger;
        // });
    }
}

Neo.applyClassConfig(Output);

export default Output;
