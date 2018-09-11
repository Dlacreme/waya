import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEditComponent } from './social-edit.component';

describe('SocialEditComponent', () => {
  let component: SocialEditComponent;
  let fixture: ComponentFixture<SocialEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
