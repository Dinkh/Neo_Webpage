import Base from '../../../../node_modules/neo.mjs/src/container/Base.mjs';

/**
 * @class Web.view.items.EmptyTile
 * @extends Neo.container.Base
 */
class EmptyTile extends Base {
    static config = {
        className: 'Web.view.items.EmptyTile',
        ntype: 'empty-tile',

        baseCls: 'empty-tile',
        height: 100,
        width: 100,

        items: [{
            ntype: 'component',
            reference: 'output-text',
            cls: ['output-text', 'fa', 'fa-plus']
        }, {
            ntype: 'component',
            reference: 'allow-pop-out',
            cls: ['allow-pop-out', 'fa-solid', 'fa-plus-square'],
        }]
    }
}

Neo.applyClassConfig(EmptyTile);

export default EmptyTile;
