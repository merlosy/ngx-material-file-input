import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AppComponent } from './app.component';
import { CodeSampleComponent } from './code-sample/code-sample.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent, CodeSampleComponent],
        imports: [
          ReactiveFormsModule,
          NoopAnimationsModule,
          // Material modules
          MatButtonModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatToolbarModule,
          // Lib Module
          MaterialFileInputModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
