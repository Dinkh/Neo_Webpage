import Section             from "../items/Section.mjs";

/**
 * @class Web.view.main.ResetInstructions
 * @extends Web.items.Section
 */
class ResetInstructions extends Section {
    static config = {
        className: 'Web.view.main.ResetInstructions',
        ntype: 'web-resetinstructions',

        cls: [ 'web-reset-instructions' ],
        items: [{
            ntype: 'component',
            vdom: {cn: [
                { tag: 'h1', innerHTML: 'MultiScreen Freigabe zurücksetzen', style: {textAlign: 'center', color: 'indianred'} },
                { tag: 'h2', innerHTML: 'Für diese Demo ist die Fensterverwaltung Freigabe erforderlich', style: {textAlign: 'center'} },
                { style: {paddingBottom: '0rem', textAlign: 'center'},
                    innerHTML: 'Du hast entweder aktiv beschlossen die Fensterverwaltung nicht freizugeben oder hast das Popup weggeclickt.<br><br>' +
                        '<b>Hinweis</b><br>Deine Settings werden nur lokal ausgelesen, nicht gespeichert und werden nicht ausserhalb Deines Rechners ausgewertet.<br>' +
                        'Diese Seite demonstriert lediglich wie man Data-Views auf andere Monitore per Drag&Drop verschieben kann und dabei weiterhin alles über eine App gesteuert wird.<br><br>' +
                        '<b>Nächster Schritt</b><br>Wenn Du die Freigabe verändern willst, dann drücke bitte auf das (i) in der Navigationsleiste.<br>' +
                        'Bitte aktiviere dort "Fensterverwaltung" und lade die Seite erneut.<br><br><br>'
                }
            ]}
        }, {
            ntype: 'container',
            cls: ['container'],
            bind: {
                html: data => data.isPWA === 'granted' ? '<i class="fa-solid fa-ellipsis-vertical" style="padding-bottom:.5rem"></i>Innerhalb der PWA klicke oben auf die drei Punkte und darin auf App-Info (i). Aktiviere Fensterverwaltung.': ''
            }
        }]
    }
}

Neo.applyClassConfig(ResetInstructions);

export default ResetInstructions;
