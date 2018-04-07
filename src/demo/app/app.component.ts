import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileValidator } from 'material-file-input-lib';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formDoc: FormGroup;

  // 100 MB
  readonly maxSize = 104857600

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formDoc = this._fb.group({
      basicfile: [],
      requiredfile: [{ value: undefined, disabled: false }, [Validators.required, FileValidator.maxContentSize(this.maxSize)]],
      disabledfile: [{ value: undefined, disabled: true }],
      multiplefile: [{ value: undefined, disabled: false }],
    });
  }

  onSubmit() {
    console.log('SUBMITTED', this.formDoc);
  }

}
