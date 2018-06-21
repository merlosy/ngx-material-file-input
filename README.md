[![Build Status](https://travis-ci.org/merlosy/ngx-material-file-input.svg?branch=master)](https://travis-ci.org/merlosy/ngx-material-file-input)

# material-file-input

This project provides :

* `ngx-mat-file-input` component, to use inside Angular Material `mat-form-field`
* a `FileValidator` with `maxContentSize`, to limit the file size
* a `ByteFormatPipe` to format the file size in a human-readable format

For more code samples, have a look at the [DEMO SITE](https://merlosy.github.io/ngx-material-file-input)

## Install

File input for Angular Material form-field

```
npm i ngx-material-file-input
```

## API reference

```ts
import { MaterialFileInputModule } from 'ngx-material-file-input';
```

#### optional NGX_MAT_FILE_INPUT_CONFIG token:

Change the unit of the ByteFormat pipe

```ts
export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

// add with module injection
providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }];
```

### NgxMatFormField

selector: `<ngx-mat-file-input>`

implements: [MatFormFieldControl](https://material.angular.io/components/form-field/api#MatFormFieldControl)<FileInput> from Angular Material

**Additionnal properties**

| Name                                  | Description                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| _@Input()_ valuePlaceholder: `string` | Placeholder for file names, empty by default                                                                                |
| _@Input()_ multiple: `boolean`        | Allows multiple file inputs, `false` by default                                                                             |
| _@Input()_ autofilled: `boolean`      | Whether the input is currently in an autofilled state. If property is not present on the control it is assumed to be false. |
| value: `FileInput`                    | form control value                                                                                                          |

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

# About me

[@jereyleg](https://twitter.com/jereyleg)

&star; to show support :)

# Roadmap

* support "accept" type of file
* drop event to add files
* _ideas?_

# Kudos to

* https://github.com/dherges/ng-packagr
* Jason Aden - Packaging Angular Libraries https://www.youtube.com/watch?v=QfvwQEJVOig
