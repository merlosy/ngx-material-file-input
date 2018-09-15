import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';
import { FileInput } from '../model/file-input.model';

// function createComponent<T>(component: Type<T>,
//   providers: Provider[] = [],
//   imports: any[] = []): ComponentFixture<T> {
// TestBed.configureTestingModule({
// imports: [
//   ReactiveFormsModule,
//   NoopAnimationsModule,
//   // Material modules
//   MatButtonModule,
//   MatFormFieldModule,
//   MatIconModule,
//   MatInputModule,
//   MatToolbarModule,
//   // Lib Module
//   MaterialFileInputModule,
// ...imports
// ],
// declarations: [AppComponent],
// providers,
// }).compileComponents();

// return TestBed.createComponent<T>(component);
// }

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FileInputComponent],
        imports: [
          ReactiveFormsModule,
          FormsModule,
          // Material modules
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatIconModule
        ],
        providers: [{ provide: NgControl, useValue: NG_VALUE_ACCESSOR }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have no files', () => {
    expect(component.value).toBeNull();
  });

  it('should add file from Input', () => {
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    component.value = new FileInput([file]);
    expect(component.value.files.length).toBe(1);
  });

  it('should set/get placeholder', () => {
    const plh = 'Upload file';
    component.placeholder = plh;
    expect(component.placeholder).toBe(plh);
  });

  it('should set/get valuePlaceholder', () => {
    const plh = 'Filenames here';
    component.valuePlaceholder = plh;
    expect(component.valuePlaceholder).toBe(plh);
  });

  it('should replace valuePlaceholder with fileNames when adding a file', () => {
    component.valuePlaceholder = 'Initial text';
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    component.value = new FileInput([file]);
    expect(component.fileNames).toBe(file.name);
  });

  it('should set/get disabled state', () => {
    component.disabled = true;
    expect(component.disabled).toBeTruthy();
  });

  it('should have `accept` attribute', () => {
    const accept = '.pdf';
    component.accept = accept;
    expect(component.accept).toBe(accept);
  })

  it('should propagate onContainerClick()', () => {
    spyOn(component, 'open').and.stub();
    component.onContainerClick({
      target: {
        tagName: 'not-input'
      } as Partial<Element>
    } as MouseEvent);
    expect(component.open).toHaveBeenCalled();
  });

  it('should not propagate onContainerClick(), when disabled', () => {
    spyOn(component, 'open').and.stub();
    component.disabled = true;
    component.onContainerClick({
      target: {
        tagName: 'not-input'
      } as Partial<Element>
    } as MouseEvent);
    expect(component.open).not.toHaveBeenCalled();
  });

  xit('should propagate click', () => {
    spyOn(component, 'open').and.stub();
    fixture.debugElement.nativeElement.click();
    expect(component.open).toHaveBeenCalled();
  });
});
