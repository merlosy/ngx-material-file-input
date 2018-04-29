[![Build Status](https://travis-ci.org/merlosy/ngx-material-file-input.svg?branch=master)](https://travis-ci.org/merlosy/ngx-material-file-input)

# material-file-input

This project provides :

* `ngx-mat-file-input` component, to use inside Angular Material `mat-form-field`
* a `FileValidator` with `maxContentSize`, to limit the file size
* a `ByteFormatPipe` to format the file size in a human-readable format

For more, have a look at the [DEMO SITE](https://merlosy.github.io/ngx-material-file-input)

## Install

File input for Angular Material form-field

```
npm i ngx-material-file-input
```

## Use

Minimal component :

```html
<mat-form-field>
  <ngx-mat-file-input formControlName="basicfile" placeholder="Basic Input" ></ngx-mat-file-input>
</mat-form-field>
```

Fully-featured component :

```html
<mat-form-field>
  <ngx-mat-file-input formControlName="requiredfile" placeholder="Required input" valuePlaceholder="No file selected" required multiple></ngx-mat-file-input>
  <mat-icon matSuffix>folder</mat-icon>
  <mat-error *ngIf="formDoc.get('requiredfile').hasError('required')">
    Please select a file
  </mat-error>
  <mat-error *ngIf="formDoc.get('requiredfile').hasError('maxContentSize')">
    The total size must not exceed {{ formDoc.get('requiredfile')?.getError('maxContentSize').maxSize | byteFormat }}
    ({{ formDoc.get('requiredfile')?.getError('maxContentSize').actualSize | byteFormat }})
  </mat-error>
</mat-form-field>
```

# Kudos to

* https://github.com/dherges/ng-packagr
* Jason Aden - Packaging Angular Libraries https://www.youtube.com/watch?v=QfvwQEJVOig
