import Neo from '../../../node_modules/neo.mjs/src/Neo.mjs';
import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';

/**
 * @class Web.src.Logger
 * @extends Neo.worker.Base
 * @singleton
 *
 * log: styled output to the console
 * @example
 *     Logger.log(myMessage);
 *         ==> console.log(myMessage)
 *     Logger.log(myMessage, myData)
 *         ==> consoleGroup(myMessage)
 *             console.log(data)
 *             console.GroupEnd()
 *
 * warn: styled output similar to log
 * error: styled output similar to log
 */
class Logger extends Base {
    static config = {
        /**
         * @member {String} className='Web.src.Logger'
         * @protected
         */
        className: 'Web.src.Logger',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    /**
     * disable output to console in production builds
     */
    onConstructed() {
        super.onConstructed();

        if(Neo.config.environment === 'dist/production') {
            this.output = emptyFn;
        }
    }

    /**
     * Colors
     * @property {String} logColor
     * @property {String} warnColor
     * @property {String} errorColor
     */
    logColor = 'teal'
    warnColor = '#6d6d00'
    errorColor = 'indianred'

    /**
     * @method log
     * output a message with/without additional data
     *
     * @param {string}  msg
     * @param {*}       data
     */
    log(msg, data) {
        this.output(msg, data, 'I', this.logColor);
    }

    warn(msg, data) {
        this.output(msg, data, 'W', this.warnColor);
    }

    error(msg, data) {
        this.output(msg, data, 'E', this.errorColor);
    }

    /**
     *
     * @param {String}      msg
     * @param {*}           data
     * @param {Character}   indicator
     * @param {String}    baseColor
     *
     * @private
     */
    output(msg, data, indicator, baseColor) {
        let bg = `background-color:${baseColor}; color: white; font-weight: 900;`,
            color = `color:${baseColor};`;

        if(data) {
            console.group(`%c ${indicator} %c ${msg}`, bg, color)
            console.log(data);
            console.groupEnd();
        } else {
            console.log(`%c ${indicator} %c ${msg}`, bg, color)
        }
    }
}

Neo.applyClassConfig(Logger);

let instance = Neo.create(Logger);

Neo.applyToGlobalNs(instance);

export default instance;