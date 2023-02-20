import Base from '../../../../node_modules/neo.mjs/src/container/Base.mjs';
import Section from "../items/Section.mjs";

/**
 * @class Web.view.main.Footer
 * @extends Neo.container.Base
 */
class Footer extends Section {
    static config = {
        className: 'Web.view.main.Footer',
        ntype: 'web-footer',

        cls: ['web-footer'],

        layout: 'base',
        items: [{
            ntype: 'component',
            html: 'Privacy/Datenschutz: No data are gathered on this page'
        }, {
            ntype: 'component',
            html: 'Contact or Want to Hire me: Please visit my LinkedIn profile <a target="blank" href="https://linkedin.com/in/dinkheller">here</a>'
        }]
    }
}

Neo.applyClassConfig(Footer);

export default Footer;
