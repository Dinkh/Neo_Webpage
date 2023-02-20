Neo.overwrites = {
    // Web.view.src.button.Alert
    // Web: {
    //     view: {
    //         src: {
    //             button: {
    //                 Alert: {
    //                     // gibt es schon
    //                     maxHeight: 100,
    //                     // ist neu
    //                     beforeSetMaxHeight(value) {
    //                         let maxValue = 50;
    //                         return (value > maxValue) ? maxValue : value;
    //                     },
    //
    //                     // komplett neu
    //                     foo_: null,
    //                     afterSetFoo(value, oldValue) {
    //                         let style = this.style;
    //                         style.maxWidth = value ? '100px' : 'auto';
    //                         this.style = style;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // },

    // Neo.component.Base
    // Neo: {
    //     component: {
    //         Base: {
    //             // new config
    //             bar: 2,
    //             // existing config, but now with trailing underscore
    //             // which calls afterSetFlex on change
    //             flex_: 1,
    //
    //             // new method
    //             afterSetFlex(value, oldValue) {
    //                 console.log('[Overwrite:afterSetFlex] value: ' + value);
    //             },
    //
    //             // existing method
    //             afterSetHeight(value, oldValue) {
    //                 console.log('[Overwrite:afterSetHeight] before callOverriden');
    //                 this.callOverwritten(...arguments);
    //                 console.log('[Overwrite:afterSetHeight] after callOverriden');
    //             }
    //         }
    //     }
    // }
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