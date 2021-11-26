import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { ExampleErrorStateMatcher } from '../utils/example-error-state-matcher';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsageComponent implements OnInit {
  errorStateMatcher = new ExampleErrorStateMatcher();
  formDoc: FormGroup;

  // 100 MB
  readonly maxSize = 104857600;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formDoc = this._fb.group({
      basicfile: [],
      removablefile: [],
      acceptfile: [],
      requiredfile: [{ value: undefined, disabled: false }, [Validators.required, FileValidator.maxContentSize(this.maxSize)]],
      disabledfile: [{ value: undefined, disabled: true }],
      multiplefile: [{ value: undefined, disabled: false }],
      errorStateFile: []
    });
  }

  onSubmit(form: FormGroup) {
    // Send file
  }

  get simple() {
    return `<mat-form-field>
      <ngx-mat-file-input formControlName="basicfile" placeholder="Basic Input" ></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get advancedTs() {
    return `import { FileValidator } from 'ngx-material-file-input';

    [...]

    /**
     * In this example, it's 100 MB (=100 * 2 ** 20).
     */
    readonly maxSize = 104857600;

    constructor(private _fb: FormBuilder) {}

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

  get removable() {
    return `<mat-form-field>
    <ngx-mat-file-input #removableInput formControlName="removablefile" placeholder="Removable Input"></ngx-mat-file-input>
    <button mat-icon-button matSuffix *ngIf="!removableInput.empty" (click)="removableInput.clear($event)">
      <mat-icon>clear</mat-icon>
    </button>
  </mat-form-field>`;
  }

  get bytePipe() {
    return `<p>A file size of {{ maxSize }} gives a human readable size of {{ maxSize | byteFormat }}</p>`;
  }

  get errorStateTs() {
    return `class ExampleErrorStateMatcher implements ErrorStateMatcher {
      public isErrorState(control: FormControl, _: NgForm | FormGroupDirective): boolean {
        return
          (control && control.value && control.value._fileNames && control.value._fileNames.endsWith('pdf'));
      }
    }`;
  }
  get errorState() {
    return `<mat-form-field>
      <ngx-mat-file-input formControlName="errorStateFile" placeholder="Shows error for PDF"
        [errorStateMatcher]="errorStateMatcher">
      </ngx-mat-file-input>
    </mat-form-field>`;
  }

}
