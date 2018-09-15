import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FileInput } from '../model/file-input.model';

export namespace FileValidator {
  /**
   * Function to control content of files
   *
   * @param bytes max number of bytes allowed
   *
   * @returns
   */
  export function maxContentSize(bytes: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const size = control && control.value ? (control.value as FileInput).files.map(f => f.size).reduce((acc, i) => acc + i, 0) : 0;
      const condition = bytes >= size;
      return condition
        ? null
        : {
            maxContentSize: {
              actualSize: size,
              maxSize: bytes
            }
          };
    };
  }
}
