# material-file-input

This is a custom fork of the original ngx-material-file-input by merlosy. find the original here: https://www.npmjs.com/package/ngx-material-file-input

## Install

```
npm i @kamikazebot/ngx-mat-file-input
```

## API reference

### MaterialFileInputModule

```ts
import { MaterialFileInputModule } from '@kamikazebot/ngx-mat-file-input';

@NgModule({
  imports: [
    // the module for this lib
    MaterialFileInputModule
  ]
})
```

#### NGX_MAT_FILE_INPUT_CONFIG token (optional):

Change the unit of the ByteFormat pipe

```ts
export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

// add with module injection
providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }];
```

### FileInputComponent

selector: `<ngx-mat-file-input>`

implements: [MatFormFieldControl](https://material.angular.io/components/form-field/api#MatFormFieldControl)<FileInput> from Angular Material

**Additionnal properties**

| Name                                  | Description                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| _@Input()_ valuePlaceholder: `string` | Placeholder for file names, empty by default                                                                                |
| _@Input()_ multiple: `boolean`        | Allows multiple file inputs, `false` by default                                                                             |
| _@Input()_ autofilled: `boolean`      | Whether the input is currently in an autofilled state. If property is not present on the control it is assumed to be false. |
| _@Input()_ accept: `string`           | Any value that `accept` attribute can get. [more about "accept"](https://www.w3schools.com/tags/att_input_accept.asp)       |
| value: `FileInput`                    | Form control value                                                                                                          |
| empty: `boolean`                    | Whether the input is empty (no files) or not                                                                                                          |
| clear(): `(event?) => void`                    | Removes all files from the input                                                                                                          |

### ByteFormatPipe

**Example**

```html
<span>{{ 104857600 | byteFormat }}</span>
```

_Output:_ 100 MB

### FileValidator

| Name                                           | Description                                     | Error structure                           |
| ---------------------------------------------- | ----------------------------------------------- | ----------------------------------------- |
| maxContentSize(value: `number`): `ValidatorFn` | Limit the total file(s) size to the given value | `{ actualSize: number, maxSize: number }` |
