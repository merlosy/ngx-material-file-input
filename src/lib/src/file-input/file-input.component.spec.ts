import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileInputComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        // Material modules
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        {provide: NgControl, useValue: NG_VALUE_ACCESSOR}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
