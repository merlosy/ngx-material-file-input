/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FileInputComponent } from './file-input/file-input.component';
import { ByteFormatPipe } from './pipe/byte-format.pipe';
export class MaterialFileInputModule {
}
MaterialFileInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FileInputComponent,
                    ByteFormatPipe
                ],
                providers: [
                    FocusMonitor
                ],
                exports: [
                    FileInputComponent,
                    ByteFormatPipe
                ]
            },] },
];
function MaterialFileInputModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaterialFileInputModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaterialFileInputModule.ctorParameters;
}
//# sourceMappingURL=material-file-input.module.js.map