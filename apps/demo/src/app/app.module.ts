import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CodeSampleComponent } from './code-sample/code-sample.component';
import { MenuComponent } from './menu/menu.component';
import { UsageComponent } from './usage/usage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
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
