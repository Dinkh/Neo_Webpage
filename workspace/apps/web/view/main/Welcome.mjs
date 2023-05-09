import DataTile            from "../items/DataTile.mjs";
import EmptyTile           from "../items/EmptyTile.mjs";
import Section             from "../items/Section.mjs";

import DashboardController from './DashboardController.mjs';
import AddNew              from "./AddNew.mjs";

/**
 * @class Web.view.main.Welcome
 * @extends Web.items.Section
 */
class Welcome extends Section {
    static config = {
        className: 'Web.view.main.Welcome',
        ntype: 'web-welcome',

        cls: [ 'web-welcome' ],
        help: 'Schau Dir mal die Box oben rechts an.<br><br>' +
            'Als ersten Schritt benötigt Chrome einmalig die Freigabe, dass Neo Deine Monitore verwalten darf. Bitte klicke auf "Freigabe".<br><br>' +
            'Für den ultimativen Support könnte Ihr die Seite als eigen App laufen lassen (PWA). Den Status dafür seht Ihr unter "Download PWA". Ein gelber Status heißt dabei immer, dass Du noch nichts gemacht hast.<br><br>' +
            'Ein weiterer Status ist, ob Du überhaupt mehr als einen Monitor hast, dann siehst Du den Status unter "Multi Screen".<br><br><br>',

        items: [{
            ntype: 'component',
            vdom: {cn: [
                { tag: 'h1', innerHTML: 'Welcome to Neo.MJS', style: {textAlign: 'center'} },
                { tag: 'h2', innerHTML: 'you can use Neo.MJS like you use Graphana', style: {textAlign: 'center'} },
                { style: {paddingBottom: '3rem', textAlign: 'center'},
                    innerHTML: 'Mit dieser Seite möchte ich Euch die Multi Screen Fähigkeit von Neo.MJS vorstellen.<br><br>' +
                        'Für eine Multi Screen Demonstration benötigt Ihr bestenfalls natürlich mehrere Monitore.<br><br>' +
                        'Sobald Du die Freigabe erteilt hast, kannst Du Data-Views auf andere Monitore per Drag&Drop verschieben.<br><br>' +
                        'Bitte klicke einmal auf "Freigabe", damit der Spaß beginnen kann.<br><br><br>' +
                        'Wenn Du irgendwann nicht weiter weißt, hover einfach über dem ?.<br>'
                }
            ]}
        }]
    }

    construct(config) {
        super.construct(config);

        this.addDomListeners({
            click: {
                fn      : this.onHelpIconClick,
                delegate: '.neo-section-help-icon',
            }
        });
    }

    onHelpIconClick() {
        Neo.main.addon.Navigator.clipboard({
            value: 'https://www.piesocket.com/websocket-tester'
        });
    }
}

Neo.applyClassConfig(Welcome);

export default Welcome;
