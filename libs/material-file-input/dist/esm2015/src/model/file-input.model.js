/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The files to be uploaded
 */
export class FileInput {
    /**
     * @param {?} _files
     * @param {?=} delimiter
     */
    constructor(_files, delimiter = ', ') {
        this._files = _files;
        this.delimiter = delimiter;
        this._fileNames = this._files.map((f) => f.name).join(delimiter);
    }
    /**
     * @return {?}
     */
    get files() {
        return this._files || [];
    }
    /**
     * @return {?}
     */
    get fileNames() {
        return this._fileNames;
    }
}
function FileInput_tsickle_Closure_declarations() {
    /** @type {?} */
    FileInput.prototype._fileNames;
    /** @type {?} */
    FileInput.prototype._files;
    /** @type {?} */
    FileInput.prototype.delimiter;
}
//# sourceMappingURL=file-input.model.js.map