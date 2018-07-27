import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StockService } from '../../api/stock.service';
import { MatSlideToggleModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { StockComponent } from './stock.component';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockComponent ],
      imports: [
        MatSlideToggleModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [
        StockService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    component.data = {
      id: 1,
      name: 'Test',
      desc: 'Description',
      size: 1,
      balance: 2,
      is_disabled: false,
      created_at: new Date(),
      updated_at: new Date(),
      stock_format: {
        id: 1,
        name: 'Stock fomrat Tst',
        is_disabled: false,
        stock_unit: {
          id: 1,
          name: 'Unit Test',
          is_disabled: false
        }
      },
      stock_type: {
        id: 1,
        name: 'Type',
        is_disabled: false
      },
      stock_format_id: 1,
      stock_type_id: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
