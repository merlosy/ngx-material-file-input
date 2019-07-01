import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FileInput } from '../model/file-input.model';
import { FileInputComponent } from './file-input.component';

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

/**
* Shows error state on a control if it is touched and has any error.
* Used as global ErrorStateMatcher for all tests.
*/
class FileInputSpecErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, _: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.errors !== null && control.touched);
  }
}

/**
* Shows error state on a control with exactly two validation errors.
* Used to change the ErrorStateMatcher of a single component.
*/
class OverrideErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, _: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.errors && control.errors.length === 2);
  }
}

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
        providers: [{ provide: NgControl, useValue: NG_VALUE_ACCESSOR }, { provide: ErrorStateMatcher, useClass: FileInputSpecErrorStateMatcher }]
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

  it('should recognize all errorstate changes', () => {
    spyOn(component.stateChanges, 'next');
    component.ngControl = <any>{ control: <any>{ errors: null, touched: false } };
    expect(component.errorState).toBeFalsy();
    expect(component.stateChanges.next).not.toHaveBeenCalled();

    fixture.detectChanges();
    expect(component.errorState).toBeFalsy();
    expect(component.stateChanges.next).not.toHaveBeenCalled();
    component.ngControl = <any>{ control: <any>{ errors: ['some error'], touched: true } };

    expect(component.stateChanges.next).not.toHaveBeenCalled();

    fixture.detectChanges();
    expect(component.errorState).toBeTruthy();
    expect(component.stateChanges.next).toHaveBeenCalledTimes(1);
  });

  it('should use input ErrorStateMatcher over provided', () => {
    component.ngControl = <any>{ control: <any>{ errors: ['some error'], touched: true } };

    fixture.detectChanges();
    expect(component.errorState).toBeTruthy();

    component.errorStateMatcher = new OverrideErrorStateMatcher();
    expect(component.errorState).toBeTruthy();

    fixture.detectChanges();
    expect(component.errorState).toBeFalsy();
    component.ngControl = <any>{ control: <any>{ errors: ['some error', 'another error'] } };
    expect(component.errorState).toBeFalsy();

    fixture.detectChanges();
    expect(component.errorState).toBeTruthy();
  });
});
