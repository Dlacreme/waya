import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImportComponent } from './stock-import.component';

describe('StockImportComponent', () => {
  let component: StockImportComponent;
  let fixture: ComponentFixture<StockImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
