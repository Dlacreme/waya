import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StockEditComponent } from './stock-edit.component';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { StockService } from '../../api/stock.service';

describe('StockEditComponent', () => {
  let component: StockEditComponent;
  let fixture: ComponentFixture<StockEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockEditComponent,
        InputComponent,
        SelectComponent,
      ],
      imports: [
        MatDialogModule
      ],
      providers: [
        StockService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEditComponent);
    component = fixture.componentInstance;
    component.nameOptions = inputOption();
    component.descOptions = inputOption();
    component.balanceOptions = inputOption();
    component.sizeOptions = inputOption();
    component.formatOptions = selectOption();
    component.typeOptions = selectOption();
    fixture.detectChanges();

    function selectOption() {
      return {
        label: 'Format',
        placeholder: 'Format',
        default: 1,
        items: []
      }
    }

    function inputOption() {
      return {
        placeholder: "Description",
        default: 1
      }
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
