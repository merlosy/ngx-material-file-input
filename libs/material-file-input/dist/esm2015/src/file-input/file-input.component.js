/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding, Renderer2, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs/Subject';
import { FileInput } from '../model/file-input.model';
export class FileInputComponent {
    /**
     * @see https://angular.io/api/forms/ControlValueAccessor
     * @param {?} ngControl
     * @param {?} fm
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(ngControl, fm, _elementRef, _renderer) {
        this.ngControl = ngControl;
        this.fm = fm;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.stateChanges = new Subject();
        this.focused = false;
        this.controlType = 'file-input';
        this._required = false;
        this.id = `app-file-input-${FileInputComponent.nextId++}`;
        this.describedBy = '';
        this._onChange = (_) => { };
        this._onTouched = () => { };
        ngControl.valueAccessor = this;
        fm.monitor(_elementRef.nativeElement, _renderer, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }
    /**
     * @return {?}
     */
    get value() {
        return this.empty ? null : new FileInput(this._elementRef.nativeElement.value || []);
    }
    /**
     * @param {?} fileInput
     * @return {?}
     */
    set value(fileInput) {
        this.writeValue(fileInput.files);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this._placeholder;
    }
    /**
     * @param {?} plh
     * @return {?}
     */
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get empty() {
        return !this._elementRef.nativeElement.value || this._elementRef.nativeElement.value.length === 0;
    }
    /**
     * @return {?}
     */
    get shouldPlaceholderFloat() {
        return this.focused || !this.empty || this.valuePlaceholder !== undefined;
    }
    /**
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        return this.disabled;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._elementRef.nativeElement.disabled;
    }
    /**
     * @param {?} dis
     * @return {?}
     */
    set disabled(dis) {
        this.setDisabledState(coerceBooleanProperty(dis));
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get errorState() {
        return this.ngControl.errors !== null && this.ngControl.touched;
    }
    /**
     * @param {?} ids
     * @return {?}
     */
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onContainerClick(event) {
        if ((/** @type {?} */ (event.target)).tagName.toLowerCase() !== 'input' && !this.disabled) {
            this._elementRef.nativeElement.querySelector('input').focus();
            this.focused = true;
            this.open();
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', obj);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    change(event) {
        const /** @type {?} */ fileList = event.target.files;
        const /** @type {?} */ fileArray = [];
        if (fileList) {
            for (let /** @type {?} */ i = 0; i < fileList.length; i++) {
                fileArray.push(fileList[i]);
            }
        }
        this.value = new FileInput(fileArray);
        this._onChange(this.value);
    }
    /**
     * @return {?}
     */
    blur() {
        this.focused = false;
        this._onTouched();
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.multiple = coerceBooleanProperty(this.multiple);
    }
    /**
     * @return {?}
     */
    open() {
        if (!this.disabled) {
            this._elementRef.nativeElement.querySelector('input').click();
        }
    }
    /**
     * @return {?}
     */
    get fileNames() {
        return this.value ? this.value.fileNames : this.valuePlaceholder;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this._elementRef.nativeElement);
    }
}
FileInputComponent.nextId = 0;
FileInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-file-input',
                template: `<input #input id="md-input-file" type="file" [attr.multiple]="multiple? '' : null">
<span class="filename">{{ fileNames }}</span>
`,
                styles: [`:host{display:inline-block}:host:not(.file-input-disabled){cursor:pointer}input{width:0;height:0;opacity:0;overflow:hidden;position:absolute;z-index:-1}.filename{display:inline-block}`],
                providers: [
                    { provide: MatFormFieldControl, useExisting: FileInputComponent }
                ]
            },] },
];
/** @nocollapse */
FileInputComponent.ctorParameters = () => [
    { type: NgControl, },
    { type: FocusMonitor, },
    { type: ElementRef, },
    { type: Renderer2, },
];
FileInputComponent.propDecorators = {
    "valuePlaceholder": [{ type: Input },],
    "multiple": [{ type: Input },],
    "id": [{ type: HostBinding },],
    "describedBy": [{ type: HostBinding, args: ['attr.aria-describedby',] },],
    "value": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "shouldPlaceholderFloat": [{ type: HostBinding, args: ['class.mat-form-field-should-float',] },],
    "required": [{ type: Input },],
    "isDisabled": [{ type: HostBinding, args: ['class.file-input-disabled',] },],
    "disabled": [{ type: Input },],
    "errorState": [{ type: Input },],
    "change": [{ type: HostListener, args: ['change', ['$event'],] },],
    "blur": [{ type: HostListener, args: ['focusout',] },],
};
function FileInputComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FileInputComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FileInputComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FileInputComponent.propDecorators;
    /** @type {?} */
    FileInputComponent.nextId;
    /** @type {?} */
    FileInputComponent.prototype.stateChanges;
    /** @type {?} */
    FileInputComponent.prototype.focused;
    /** @type {?} */
    FileInputComponent.prototype.controlType;
    /** @type {?} */
    FileInputComponent.prototype._placeholder;
    /** @type {?} */
    FileInputComponent.prototype._required;
    /** @type {?} */
    FileInputComponent.prototype.valuePlaceholder;
    /** @type {?} */
    FileInputComponent.prototype.multiple;
    /** @type {?} */
    FileInputComponent.prototype.id;
    /** @type {?} */
    FileInputComponent.prototype.describedBy;
    /** @type {?} */
    FileInputComponent.prototype._onChange;
    /** @type {?} */
    FileInputComponent.prototype._onTouched;
    /** @type {?} */
    FileInputComponent.prototype.ngControl;
    /** @type {?} */
    FileInputComponent.prototype.fm;
    /** @type {?} */
    FileInputComponent.prototype._elementRef;
    /** @type {?} */
    FileInputComponent.prototype._renderer;
}
//# sourceMappingURL=file-input.component.js.map