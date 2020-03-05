import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, NgForm, FormGroupDirective } from '@angular/forms';

/**
* Shows error state on the file-input if a pdf-file is selected.
*/
export class ExampleErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl, _: NgForm | FormGroupDirective): boolean {
    return (control && control.value && control.value._fileNames && control.value._fileNames.endsWith('pdf'));
  }
}
