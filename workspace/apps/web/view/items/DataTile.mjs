import BaseContainer from '../../../../node_modules/neo.mjs/src/container/Base.mjs';

/**
 * @class Web.view.items.DataTile
 * @extends Neo.container.Base
 */
class DataTile extends BaseContainer {
    customInitialized = false

    static config = {
        className: 'Web.view.items.DataTile',
        ntype: 'data-tile',

        baseCls: 'data-tile',
        height: 100,
        width: 195,

        //source: 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self&value=Hi',
        source: 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
        connectionType_: 'webSocket',

        items: [{
            ntype: 'component',
            cls: ['data-tile-header'],
            vdom: {cn: [{cls: 'connecting'},{cls: 'receiving'},{cls: 'ended'}]}
        },{
            ntype: 'component',
            reference: 'output-text',
            cls: ['output-text'],
            html: 1
        }, {
            ntype: 'component',
            reference: 'allow-pop-out',
            cls: ['allow-pop-out', 'fa-solid', 'fa-square-up-right'],
        }]
    }

    construct (config) {
        const me = this;
        super.construct(config);

        me.addDomListeners(me.#clickEventListener());
        me.on(me.#renderEventListener())
    }

    afterRender() {
        const me = this,
            type = me.connectionType;

        if(type)
            me[type]();

        me.un(me.#renderEventListener());
    }


    onClick(data) {
        let comp = data.component,
            allow = comp.getReference('allow-pop-out'),
            parent = comp.up();
// console.log('onClick')
        if(comp.orgParent) return;

        // prepare data-tile
        comp.addCls('windowed');
        comp.orgParent = parent.id;
        allow.hide();

        let dialog = Neo.create({
            className: 'Web.view.items.Dialog',
            appName: 'Web',
            height: 168,
            width: 228,
            items: [comp],
            animateTargetId: comp.id
        });

        parent.remove(comp, false);
    }

    setState(value) {
        const me = this;

        me.removeCls('connect');
        me.removeCls('receive');
        me.removeCls('end');

        me.addCls(value);

        if(value === 'receive') {
            Neo.timeout(350).then(() => {
                me.removeCls('receive');
            })
        }
    }

    webSocket () {
        const me = this,
            output = me.getReference('output-text'),
            host = this.source;

        try {
            let socket;

            socket = new WebSocket(host);
            output.html = '...connecting...';

            socket.onopen = function (msg) {
                output.html = '...waiting for data...';
                me.setState('connect');
            };

            socket.onmessage = function (msg) {
                const data = msg.data;

//                console.log("Received: " + msg.data);
                output.html = msg.data;
                me.setState('receive');

                if(data === '/close')
                    socket.close()
            };

            socket.onclose = function (msg) {
                output.html = 'connection closed';
                me.setState('end');
            };
        } catch (ex) {
            output.html= 'Failed connection';
            console.log(ex);
        }
    }

    #clickEventListener() {
        return {
            click: this.onClick,
            scope: this
        }
    }

    #renderEventListener() {
        return {
            rendered: this.afterRender,
            scope: this
        }
    }
}

Neo.applyClassConfig(DataTile);

export default DataTile;
