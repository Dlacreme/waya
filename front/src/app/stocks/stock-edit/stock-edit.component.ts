import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stock, StockService, StockFormat, StockType } from '../../api/stock.service';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';
import { MatDialog } from '@angular/material';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { ApiResult, ApiItem } from '../../api/api';
import { InputOptions, InputType } from '../../form/input/input.component';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  public data:Stock;

  public nameOptions:InputOptions;
  public descOptions:InputOptions;
  public balanceOptions:InputOptions;
  public formatOptions:SelectOptions;
  public typeOptions:SelectOptions;

  public formats:StockFormat[] = [];
  public types:StockType[] = [];

  constructor(
    public stockService:StockService,
    public dialog:MatDialog,
  ) { }

  @Input()
  set stock(stock:Stock) {
    this.data = JSON.parse(JSON.stringify(stock));
  }

  @Output() afterupdate = new EventEmitter();

  ngOnInit() {
    this.initNameOptions();
    this.initDescOptions();
    this.initBalanceOptions();
    this.initFormatOptions();
    this.initTypeOptions();
  }

  public openDeleteValidation():void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${this.data.name}?`
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.stockService.delete(this.data.id).subscribe();
      }
    });
  }

  private initNameOptions():void {
    this.nameOptions = {
      placeholder: 'Name',
      default: this.data.name
    }
  }

  private initDescOptions():void {
    this.descOptions = {
      placeholder: "Description",
      default: this.data.desc,
      type: InputType.Textarea
    };
  }

  private initBalanceOptions():void {
    this.balanceOptions = {
      label: "Balance",
      placeholder: "Balance",
      default: this.data.balance,
      type: InputType.Number
    };
  }

  private initFormatOptions():void {
    this.formatOptions = {
      label: 'Format',
      placeholder: 'Format',
      default: this.data.stock_format.id,
      items: []
    };

    const formatSub = this.stockService.getFormats()
      .subscribe((res) => {
        formatSub.unsubscribe();
        if (res.data) {
          this.formats = res.data;
        }
        this.insertItems(this.formatOptions.items, res.data as ApiItem[]);
      });
  }

  private initTypeOptions():void {
    this.typeOptions = {
      label: 'Type',
      placeholder: 'Type',
      default: this.data.stock_type.id,
      items: []
    };

    const typeSub = this.stockService.getTypes()
    .subscribe((res) => {
      typeSub.unsubscribe();
      if (res.data) {
        this.types = res.data;
      }
      this.insertItems(this.typeOptions.items, res.data as ApiItem[]);
    });
  }

  private insertItems<T, V>(array:SelectItem[], apiData:ApiItem[]):void {
    if (!apiData) {
      return;
    }
    apiData.forEach((item) => {
      array.push({
        value: item.id,
        text: item.name
      });
    });
  }

  public updateName(name:string):void {
    this.data.name = name;
  }

  public updateDesc(desc:string):void {
    this.data.desc = desc;
  }

  public updateBalance(balance:number):void {
    this.data.balance = balance;
  }

  public updateFormat(format:SelectItem):void {
    this.data.stock_format_id = format.value;
    const stockFormat = this.formats.find((item) => item.id === format.value);
    if (stockFormat) {
      this.data.stock_format = stockFormat;
    }
  }

  public updateType(type:SelectItem):void {
    this.data.stock_type_id = type.value;
    const stockType = this.types.find((item) => item.id === type.value);
    if (stockType) {
      this.data.stock_type = stockType;
    }
  }

  public update():void {
    window.setTimeout(() => {
      const updateSub = this.stockService
        .update(this.data)
        .subscribe((res) => {
          updateSub.unsubscribe();
          this.afterupdate.emit(res.data);
        });
    });
  }

}