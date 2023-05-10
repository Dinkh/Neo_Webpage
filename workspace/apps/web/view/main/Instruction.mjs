import Base     from '../../../../node_modules/neo.mjs/src/component/Base.mjs';
import NeoArray from '../../../../node_modules/neo.mjs/src/util/Array.mjs';

/**
 * @class Web.view.main.Instruction
 * @extends Neo.component.Base
 */
class Instruction extends Base {
    static config = {
        className: 'Web.view.main.Instruction',

        cls: ['web-background-bar layout'],

        vdom: {
            tag: 'section', cn: [
                {
                    cls: 'neo-section-inner',
                    cn: [
                        {tag: 'h1', innerHTML: 'Dashboard'},
                        {tag: 'h2', innerHTML: 'Neo.MJS kann wie Graphana genutzt werden'},
                        {
                            style: {
                                background: 'rgb(0 0 0 / 50%)',
                                padding: '30px',
                                borderRadius: '15px',
                                textAlign: 'center'
                            },
                            innerHTML: 'Wähle eine Daten-Visualisierung unten aus. Einfach indem Du darauf klickst.<br>' +
                                'Damit erhältst du ein Fenster, dass Du frei positionieren kannst.<br><br>' +
                                'Diese Demo zeigt, dass Du das Fenster auch auf einen anderen Bildschirm ziehen kannst.<br>' +
                                'Probiere es gleich einmal mit der vordefinierten Datenverbindung aus oder füge eine eigene hinzu.<br><br>' +
                                'Wenn Du ein externes Fenster schließt werden die Daten wieder hier angezeigt und wenn Du die Seite verlässt werden alle externen Fenster mit geschlossen.'
                        }
                    ]
                }
            ]
        }
    }
}

Neo.applyClassConfig(Instruction);

export default Instruction;
