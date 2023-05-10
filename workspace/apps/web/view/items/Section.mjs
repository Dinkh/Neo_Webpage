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
        help_: null,
        items: [/* FROM */],

        vdom:{
            tag: 'section',
            cn: [
                {cls: 'neo-section-inner', cn: [/* TO */]},
                {cls: 'neo-section-help neo-section-inner', removeDom: true, cn: [
                    {cls: 'neo-section-help-icon', innerHTML: '?'},
                    {cls: 'neo-section-help-text', removeDom: true}
                ]}
            ]
        },

        domListeners: {
            mouseenter: {
                fn      : 'onHelpIconHover',
                delegate: '.neo-section-help-icon',
                scope   : 'this'
            },
            mouseleave: {
                fn      : 'onHelpIconHover',
                delegate: '.neo-section-help-icon',
                scope   : 'this'
            }
        }
    }

    afterSetHelp(value) {
        if(!value) return;
        const vdom = this.vdom.cn[1];

        vdom.cn[1].innerHTML = value;
        vdom.removeDom = false;
    }

    async onHelpIconHover(data) {
        let isHidden = data.type === 'mouseenter',
            vdom = this.vdom.cn[1].cn[1];

        if(isHidden) {
            vdom.removeDom = !isHidden;
            this.update();
            this.addCls('show-help');
        } else {
            this.removeCls('show-help');
            await Neo.timeout(125);
            vdom.removeDom = !isHidden;
            this.update();
        }
    }

    getVdomItemsRoot() {
        return this.getVdomRoot().cn[0];
    }
}

Neo.applyClassConfig(Section);

export default Section;
