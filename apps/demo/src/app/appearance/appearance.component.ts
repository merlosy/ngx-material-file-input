import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.css']
})
export class AppearanceComponent implements OnInit {
  formDoc: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formDoc = this._fb.group({
      legacyNoLabel: [],
      legacy: [],
      standard: [],
      fill: [],
      outline: []
    });
  }

  get legacyNoLabel() {
    return `<mat-form-field appearance="legacy">
      <ngx-mat-file-input formControlName="legacy" placeholder="Basic legacy placeholder" ></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get legacy() {
    return `<mat-form-field appearance="legacy">
      <mat-label>Basic legacy input</mat-label>
      <ngx-mat-file-input formControlName="legacy" placeholder="Basic legacy placeholder" ></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get standard() {
    return `<mat-form-field appearance="standard">
      <mat-label>Basic standard input</mat-label>
      <ngx-mat-file-input formControlName="standard" placeholder="Basic standard placeholder" ></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get fill() {
    return `<mat-form-field appearance="fill">
      <mat-label>Basic fill input</mat-label>
      <ngx-mat-file-input formControlName="fill" placeholder="Basic fill placeholder" ></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

  get outline() {
    return `<mat-form-field appearance="outline">
      <mat-label>Basic outline input</mat-label>
      <ngx-mat-file-input formControlName="outline" placeholder="Basic outline placeholder" ></ngx-mat-file-input>
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>`;
  }

}
