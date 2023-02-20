import Base     from '../../../../node_modules/neo.mjs/src/component/Base.mjs';
import NeoArray from '../../../../node_modules/neo.mjs/src/util/Array.mjs';

/**
 * @class Web.view.main.Layout
 * @extends Neo.component.Base
 */
class Layout extends Base {
    static config = {
        className: 'Web.view.main.Layout',

        top_: null,
        bottom_: null,
        left_: null,
        right_: null,
        center_: null,
        current_: null,

        cls: ['web-background-bar layout'],

        vdom: {
            tag: 'section', cn: [
                {
                    cls: 'neo-section-inner',
                    cn: [
                        {tag: 'h1', innerHTML: 'Monitor Layout'},
                        {cls: ['layout-top']},
                        {
                            cls: ['layout-center-row'], cn: [
                                {cls: ['layout-left']},
                                {cls: ['layout-center']},
                                {cls: ['layout-right']}
                            ]
                        },
                        {cls: ['layout-bottom']}
                    ]
                }
            ]
        }
    }

    /**
     * @event currentscreenchange => changeEventFn
     */

    construct(config) {
        const me = this;

        super.construct(config);

        Neo.timeout(150).then(data => {
            let currentScreenLayout = Neo.main.addon.ScreenDetails.getCurrentLayout().then(data => {
                console.log(data);
                me.set(data);
            });
        });

        // 'currentscreenchange'
        Neo.main.addon.ScreenDetails.registerEventListener(me.id);
        this.addDomListeners({
            currentscreenchange: this.changeEventFn
        });
    }

    afterSetTop(value)    { this.doLayoutItem('Top', value); }
    afterSetLeft(value)   { this.doLayoutItem('Left', value); }
    afterSetRight(value)  { this.doLayoutItem('Right', value); }
    afterSetBottom(value) { this.doLayoutItem('Bottom', value); }
    afterSetCenter(value) { this.doLayoutItem('Center', value); }

    /**
     * Changing the current Monitor has to rerender all positions
     * @param {String} value
     */
    afterSetCurrent(value) {
        let me = this,
            allPositions = ['Top', 'Bottom', 'Left', 'Center', 'Right'];

        allPositions.forEach((position) => me.checkPositionNodeForCurrent(position, value));

        me.update();
    }

    /**
     * When the current Monitor changes, set current to the new Screen
     * @param {Event} data
     */
    changeEventFn(data) {
        this.current = data.value;
    }

    /**
     * Clear the position from `active` and if true set `active`
     * @param {String} position
     * @param {String} value
     */
    checkPositionNodeForCurrent(position, value) {
        let activeCls = 'layout-active',
            node = this[`get${position}Node`](),
            cls = node.cls;

        position = position.toLowerCase();

        NeoArray.remove(cls, activeCls);
        if(value === position) {
            NeoArray.add(cls, activeCls);
        }
    }

    /**
     * Add cls for empty `layout-empty-item` or filled `layout-item`
     * @param {String} position
     * @param {true|null} value
     */
    doLayoutItem(position, value) {
        let me = this,
            vdom = me[`get${position}Node`](),
            cls;

        position = position.toLowerCase();
        cls = ['layout-item', 'layout-' + position];

        if(!value) cls.push('layout-empty-item');

        vdom.cls = cls;
        me.update();
    }

    getTopNode()    { return this.vdom.cn[0].cn[1]; }
    getBottomNode() { return this.vdom.cn[0].cn[3]; }
    getLeftNode()   { return this.vdom.cn[0].cn[2].cn[0]; }
    getCenterNode() { return this.vdom.cn[0].cn[2].cn[1]; }
    getRightNode()  { return this.vdom.cn[0].cn[2].cn[2]; }
}

Neo.applyClassConfig(Layout);

export default Layout;
