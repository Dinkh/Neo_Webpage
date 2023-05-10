import Viewport from '../../node_modules/neo.mjs/src/container/Viewport.mjs';
import Container from '../../node_modules/neo.mjs/src/container/Base.mjs';

/**
 * @class ExternalWindow.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static config = {
        className: 'ExternalWindow.MainContainer',
        autoMount: true,

        layout   : {
            ntype: 'vbox',
            align: 'stretch'
        },
        items: [
            // {
            //     module: Container,
            //     cls: ['web-main'],
            //     html: 'DRAGGING<br>GHOST'
            // }
        ]
    }
}

Neo.applyClassConfig(MainContainer);

export default MainContainer;
