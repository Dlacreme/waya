import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ValidationDialogComponent } from './validation-dialog.component';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';

describe('ValidationDialogComponent', () => {
  let component: ValidationDialogComponent;
  let fixture: ComponentFixture<ValidationDialogComponent>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDialogComponent ],
      imports: [
        MatDialogModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDialogComponent);
    component = fixture.componentInstance;
    component.dialogRef = dialog.open(ValidationDialogComponent, {
      width: '250px'
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
