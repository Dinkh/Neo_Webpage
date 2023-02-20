import Base from '../../../../node_modules/neo.mjs/src/container/Base.mjs';

/**
 * @class Web.view.items.Section
 * @extends Neo.container.Base
 */
class Section extends Base {
    static config = {
        className: 'Web.view.items.Section',
        ntype: 'neo-section',

        baseCls: ['neo-section'],

        items: [],
        vdom:{
            tag: 'section',
            cn: [{
                cls: 'neo-section-inner',
                cn: []
            }]
        }
    }

    getVdomItemsRoot() {
        return this.getVdomRoot().cn[0];
    }
}

Neo.applyClassConfig(Section);

export default Section;
