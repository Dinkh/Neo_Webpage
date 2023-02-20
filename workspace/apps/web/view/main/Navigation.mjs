import Base from '../../../../node_modules/neo.mjs/src/component/Base.mjs';

/**
 * @class Web.view.main.Navigation
 * @extends Neo.container.Base
 */
class Navigation extends Base {
    static config = {
        className: 'Web.view.main.Navigation',
        ntype: 'web-navigation',

        cls: ['web-navigation'],
        vdom: {
            cn: [{
                tag: 'image',
                src: './neo.svg',
                cls: 'brand-image'
            }, {
                tag: 'i',
                cls: 'brand',
                innerHTML: 'Neo.MJS by Torsten Dinkheller'
            }, {
                cls: 'spacer'
            }, {
                tag: 'nav',
                cn: [{
                    tag: 'a',
                    href: '#monitor-layout',
                    innerHTML: 'Monitor support'
                }, {
                    tag: 'a',
                    href: '#dashboard',
                    innerHTML: 'Dashboard'
                }, {
                    tag: 'a',
                    href: '#footer',
                    innerHTML: 'Contact'
                }]
            }]
        }
    }
}

Neo.applyClassConfig(Navigation);

export default Navigation;
