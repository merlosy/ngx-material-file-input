import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formDoc: FormGroup;

  // 100 MB
  readonly maxSize = 104857600;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formDoc = this._fb.group({
      basicfile: [],
      acceptfile: [],
      requiredfile: [{ value: undefined, disabled: false }, [Validators.required, FileValidator.maxContentSize(this.maxSize)]],
      disabledfile: [{ value: undefined, disabled: true }],
      multiplefile: [{ value: undefined, disabled: false }]
    });
  }

  onSubmit(form: FormGroup) {}

  get simple() {
    return `<mat-form-field>
      <ngx-mat-file-input formControlName="basicfile" placeholder="Basic Input" ></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get advancedTs() {
    return `constructor(private _fb: FormBuilder) {}

    ngOnInit() {
      this.formDoc = this._fb.group({
        requiredfile: [
          undefined,
          [Validators.required, FileValidator.maxContentSize(this.maxSize)]
        ]
      });
    }`;
  }

  get advanced() {
    return `<mat-form-field>
      <ngx-mat-file-input formControlName="requiredfile" placeholder="Required input" valuePlaceholder="No file selected" required></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
      <mat-error *ngIf="formDoc.get('requiredfile').hasError('required')">
        Please select a file
      </mat-error>
      <mat-error *ngIf="formDoc.get('requiredfile').hasError('maxContentSize')">
        The total size must not exceed {{formDoc.get('requiredfile')?.getError('maxContentSize').maxSize | byteFormat}} ({{formDoc.get('requiredfile')?.getError('maxContentSize').actualSize
        | byteFormat}}).
      </mat-error>
    </mat-form-field>`;
  }

  get disabledTs() {
    return `constructor(private _fb: FormBuilder) {}

    ngOnInit() {
      this.formDoc = this._fb.group({
        disabledfile: [{ value: undefined, disabled: true }]
      });
    }`;
  }

  get accept() {
    return `<mat-form-field>
      <ngx-mat-file-input formControlName="acceptfile" placeholder="PDF file only" [accept]="'.pdf'"></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get multiple() {
    return `<mat-form-field>
      <ngx-mat-file-input formControlName="multiplefile" placeholder="Multiple inputs" multiple></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get bytePipe() {
    return `<p>A file size of {{ maxSize }} gives a human readable size of {{ maxSize | byteFormat }}</p>`;
  }
}
