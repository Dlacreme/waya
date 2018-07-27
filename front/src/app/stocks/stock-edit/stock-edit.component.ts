import { Component, OnInit, Input } from '@angular/core';
import { Stock, StockService, StockFormat } from '../../api/stock.service';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';
import { MatDialog } from '@angular/material';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { ApiResult, ApiItem } from '../../api/api';
import { InputOptions } from '../../form/input/input.component';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  public data:Stock;

  public nameOptions:InputOptions;
  public formatOptions:SelectOptions;
  public typeOptions:SelectOptions;

  constructor(
    public stockService:StockService,
    public dialog:MatDialog,
  ) { }

  @Input()
  set stock(stock:Stock) {
    this.data = stock;
  }

  ngOnInit() {
    this.initNameOptions();
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
      placeholder: 'Name...',
      default: this.data.name
    }
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

  public updateFormat(format:SelectItem):void {
    this.data.stock_format_id = format.value;
  }

  public updateType(type:SelectItem):void {
    this.data.stock_type_id = type.value;
  }

  public update():void {
    window.setTimeout(() => {
      console.log('UPDATE > ', this.data);
    });
  }

}
