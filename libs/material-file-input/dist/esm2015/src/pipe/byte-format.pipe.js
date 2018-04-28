/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
export class ByteFormatPipe {
    constructor() {
        this.unit = 'Byte';
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        if (!!value) {
            value = this.formatBytes(+value, +args);
        }
        return value;
    }
    /**
     * @param {?} bytes
     * @param {?=} decimals
     * @return {?}
     */
    formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0 ' + this.unit;
        }
        ;
        const /** @type {?} */ B = this.unit.charAt(0);
        const /** @type {?} */ k = 1024, /** @type {?} */
        dm = decimals || 2, /** @type {?} */
        sizes = [this.unit, 'K' + B, 'M' + B, 'G' + B, 'T' + B, 'P' + B, 'E' + B, 'Z' + B, 'Y' + B], /** @type {?} */
        i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
ByteFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'byteFormat'
            },] },
];
function ByteFormatPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ByteFormatPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ByteFormatPipe.ctorParameters;
    /** @type {?} */
    ByteFormatPipe.prototype.unit;
}
//# sourceMappingURL=byte-format.pipe.js.map