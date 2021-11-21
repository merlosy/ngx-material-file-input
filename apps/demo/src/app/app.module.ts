import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { MenuComponent } from './menu/menu.component';
import { UsageComponent } from './usage/usage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppearanceComponent } from './appearance/appearance.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Material modules
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    // Lib Module
    MaterialFileInputModule
  ],
  declarations: [
    AppComponent,
    AppearanceComponent,
    CodeSampleComponent,
    MenuComponent,
    UsageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
