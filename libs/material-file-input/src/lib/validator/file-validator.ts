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
    return (control: AbstractControl): { [key: string]: any } | null => {
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

  /**
   *
   * @description Handles allowed file types by controlling whether some specific extensions matches with the uploaded file type
   * @export
   * @param {string[]} extensions
   * @returns {ValidatorFn}
   */
  export function allowedExtensions(extensions: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const allowed =
        control &&
        control.value &&
        (control.value as FileInput).files.every(file => {

          const fileNameSplit = file.name.split('.')

          const extension = fileNameSplit[fileNameSplit.length - 1];

          const foundIndex = extensions.indexOf(extension);

          return foundIndex !== -1;
        });

      return allowed
        ? null
        : {
          allowedExtensions: extensions
          };
    };
  }
}
