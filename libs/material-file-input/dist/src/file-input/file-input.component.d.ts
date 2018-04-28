import { OnInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs/Subject';
import { FileInput } from '../model/file-input.model';
export declare class FileInputComponent implements MatFormFieldControl<FileInput>, ControlValueAccessor, OnInit, OnDestroy {
    ngControl: NgControl;
    private fm;
    private _elementRef;
    private _renderer;
    static nextId: number;
    stateChanges: Subject<void>;
    focused: boolean;
    controlType: string;
    private _placeholder;
    private _required;
    valuePlaceholder: string;
    multiple: boolean;
    id: string;
    describedBy: string;
    value: FileInput | null;
    placeholder: string;
    readonly empty: boolean;
    readonly shouldPlaceholderFloat: boolean;
    required: boolean;
    readonly isDisabled: boolean;
    disabled: boolean;
    readonly errorState: boolean;
    setDescribedByIds(ids: string[]): void;
    onContainerClick(event: MouseEvent): void;
    /**
     * @see https://angular.io/api/forms/ControlValueAccessor
     */
    constructor(ngControl: NgControl, fm: FocusMonitor, _elementRef: ElementRef, _renderer: Renderer2);
    private _onChange;
    private _onTouched;
    writeValue(obj: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: any): void;
    change(event: any): void;
    blur(): void;
    setDisabledState?(isDisabled: boolean): void;
    ngOnInit(): void;
    open(): void;
    readonly fileNames: string;
    ngOnDestroy(): void;
}
