import Section             from "../items/Section.mjs";

/**
 * @class Web.view.main.Welcome
 * @extends Web.items.Section
 */
class Welcome extends Section {
    static config = {
        className: 'Web.view.main.Welcome',
        ntype: 'web-welcome',

        cls: [ 'web-welcome' ],
        // help: 'Schau Dir mal die Box oben rechts an.<br><br>' +
        //     'Als ersten Schritt benötigt Chrome einmalig die Freigabe, dass Neo Deine Monitore verwalten darf. Bitte klicke auf "Freigabe".<br><br>' +
        //     'Für den ultimativen Support könnte Ihr die Seite als eigen App laufen lassen (PWA). Den Status dafür seht Ihr unter "Download PWA". Ein gelber Status heißt dabei immer, dass Du noch nichts gemacht hast.<br><br>' +
        //     'Ein weiterer Status ist, ob Du überhaupt mehr als einen Monitor hast, dann siehst Du den Status unter "Multi Screen".<br><br><br>',

        items: [{
            ntype: 'component',
            vdom: {cn: [
                { tag: 'h1', innerHTML: 'Welcome to Neo.MJS', style: {textAlign: 'center'} },
                { tag: 'h2', innerHTML: 'Neo.MJS kann wie Graphana genutzt werden', style: {textAlign: 'center'} },
                { style: {paddingBottom: '0rem', textAlign: 'center'},
                    innerHTML: 'Mit dieser Seite möchte ich Euch die Multi-Screen Fähigkeit von Neo.MJS vorstellen.<br><br>' +
                        'Für eine Multi Screen Demonstration benötigt Ihr bestenfalls natürlich mehrere Monitore.<br><br>' +
                        'Sobald Du die Freigabe erteilt hast, kannst Du Data-Views auf andere Monitore per Drag&Drop verschieben.<br><br>' +
                        'Bitte klicke einmal rechts auf "Freigabe", damit der Spaß beginnen kann.<br><br><br>'
                },
                { tag: 'h2', innerHTML: 'Die Stati rechts lesen sich wie folgt', style: {textAlign: 'center'} },
            ]}
        }, {
            ntype: 'container',
            cls: ['container','pending'],
            html: '<i class="neo-svg neo-button-glyph icon-permission"></i>Du hast die Freigabe noch nicht erteilt.<br>Klicke rechts oben auf die Schaltfläche mit diesem Icon, um die Freigabe zu erteilen.'
        }, {
            ntype: 'container',
            bind: {
                cls: data => data.isPWA === 'granted' ? ['container','granted'] : ['container','pending'],
                html: data => data.isPWA === 'granted' ? '<i class="neo-svg neo-button-glyph icon-pwa"></i>Sehr gut. Du hast die App als PWA installiert.' : '<i class="neo-svg neo-button-glyph icon-pwa"></i>Du kannst die App als PWA installieren.<br>Über die Navigationszeile und das gleiche Symbol kannst du diese App installieren.'
            }
        }, {
            ntype: 'container',
            bind: {
                cls: data => data.isMultiScreen === 'granted' ? ['container','granted'] : ['container','pending'],
                html: data => data.isMultiScreen === 'granted' ? '<i class="neo-svg neo-button-glyph icon-multiscreen"></i>Sehr gut. Du hast mehrere Monitore.' : '<i class="neo-svg neo-button-glyph icon-multiscreen"></i>Du hast nur einen Bildschirm. Optimal wäre, wenn Du dieses Fenster nur auf dem halbem Bildschrim nutzt, damit Du Fenster aus dem Browser rausziehen kannst.'
            }
        }]
    }
}

Neo.applyClassConfig(Welcome);

export default Welcome;
