import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

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

  it('should have no files by default', () => {
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
  });

  xit('should refuse invalid format, based on `accept` attribute', () => {
    const accept = '.png';
    component.accept = accept;
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    component.value = new FileInput([file]);
    expect(component.fileNames).toBe('');
  });

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

  it('should remove file from Input', fakeAsync(() => {
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    component.value = new FileInput([file]);
    fixture.nativeElement.querySelector('input').dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(component.value.files.length).toBe(1);
    // expect(fixture.nativeElement.querySelector('input').files.length).toBe(1); // is 0, this should be incremented
    component.clear();
    tick();
    fixture.detectChanges();
    expect(component.empty).toBeTruthy();
    expect(component.value).toBeNull();
    // expect(fixture.nativeElement.querySelector('input').value).toBe('');
  }));

  xit('should propagate click', () => {
    spyOn(component, 'open').and.stub();
    fixture.debugElement.nativeElement.click();
    expect(component.open).toHaveBeenCalled();
  });
});
