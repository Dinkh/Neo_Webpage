Neo.overwrites = {
    // Neo.component.Base
    Neo: {
        component: {
            Base: {
                afterSetDomListeners(value, oldValue) {
                    let me = this;

                    me.presetListenersScope(value);
                    me.callOverwritten(...arguments);
                },

                presetListenersScope(listenersArray) {
                    let me = this;

                    listenersArray.forEach((listeners) => {
                        for (const ev in listeners) {
                            const listener = listeners[ev];
                            if(!Neo.isFunction(listener.fn) && listener.scope === 'this') {
                                listener.fn = me[listener.fn].bind(me);
                            }
                        }
                    });
                    return listenersArray;
                }
            }
        },
        button: {
            Base: {
                displaySmall_: false,
                orgText: null,
                afterSetDisplaySmall(newValue) {
                    const me = this,
                        text = me.text;
                    let orgText = me.orgText;

                    if (!newValue && text) orgText = text;

                    me.orgText = newValue ? text : null;
                    me.text = !newValue ? orgText : null;
                }
            }
        }
    }
};

export default Neo.overwrites;

/*
Name of your theme: web-light
                    =========
create folder in resources
    => neo-theme-web-light

neo-config-json
    ."themes": ["neo-theme-web-light"],
copy node_modules.neo_mjs.resources.scss.theme
        exclude apps folder
copy workspace.resources.srcc.theme.apps

regex replace /:root \.neo-theme-light/
            =>:root .noe-theme-web-light
 */