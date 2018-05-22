import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CodeSampleComponent } from './code-sample/code-sample.component';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Material modules
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    // Lib Module
    MaterialFileInputModule
  ],
  declarations: [AppComponent, CodeSampleComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
