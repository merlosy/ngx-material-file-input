import { Component, OnInit, Input, ElementRef, OnDestroy, HostBinding, Renderer2, HostListener, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

import { FileInput } from '../model/file-input.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-mat-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: FileInputComponent }]
})
export class FileInputComponent implements MatFormFieldControl<FileInput>, ControlValueAccessor, OnInit, OnDestroy {
  static nextId = 0;

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'file-input';

  @Input() autofilled = false;

  private _placeholder: string;
  private _required = false;

  @Input() valuePlaceholder: string;
  @Input() multiple: boolean;
  @Input() accept: string | null = null;

  @HostBinding() id = `ngx-mat-file-input-${FileInputComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  @Input()
  get value(): FileInput | null {
    return this.empty ? null : new FileInput(this._elementRef.nativeElement.value || []);
  }
  set value(fileInput: FileInput | null) {
    if (fileInput) {
      this.writeValue(fileInput);
      this.stateChanges.next();
    }
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  /**
   * Whether the current input has files
   */
  get empty() {
    return !this._elementRef.nativeElement.value || this._elementRef.nativeElement.value.length === 0;
  }

  @HostBinding('class.mat-form-field-should-float')
  get shouldLabelFloat() {
    return this.focused || !this.empty || this.valuePlaceholder !== undefined;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @HostBinding('class.file-input-disabled')
  get isDisabled() {
    return this.disabled;
  }
  @Input()
  get disabled(): boolean {
    return this._elementRef.nativeElement.disabled;
  }
  set disabled(dis: boolean) {
    this.setDisabledState(coerceBooleanProperty(dis));
    this.stateChanges.next();
  }

  @Input()
  get errorState(): boolean {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled) {
      this._elementRef.nativeElement.querySelector('input').focus();
      this.focused = true;
      this.open();
    }
  }

  /**
   * @see https://angular.io/api/forms/ControlValueAccessor
   */
  constructor(
    @Optional()
    @Self()
    public ngControl: NgControl,
    private fm: FocusMonitor,
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(_elementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  get fileNames() {
    return this.value ? this.value.fileNames : this.valuePlaceholder;
  }

  writeValue(obj: FileInput | null): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', obj instanceof FileInput ? obj.files : null);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /**
   * Remove all files from the file input component
   * @param {Event?} event that may have triggered the clear action
   */
  clear(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.value = new FileInput([]);
    this._onChange(this.value);
  }

  @HostListener('change', ['$event'])
  change(event: Event) {
    const fileList: FileList | null = (<HTMLInputElement>event.target).files;
    const fileArray: File[] = [];
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i]);
      }
    }
    this.value = new FileInput(fileArray);
    this._onChange(this.value);
  }

  @HostListener('focusout')
  blur() {
    this.focused = false;
    this._onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  ngOnInit() {
    this.multiple = coerceBooleanProperty(this.multiple);
  }

  open() {
    if (!this.disabled) {
      this._elementRef.nativeElement.querySelector('input').click();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this._elementRef.nativeElement);
  }
}
