import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoEditComponent } from './compo-edit.component';

describe('CompoEditComponent', () => {
  let component: CompoEditComponent;
  let fixture: ComponentFixture<CompoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
