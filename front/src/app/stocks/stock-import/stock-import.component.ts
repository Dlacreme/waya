import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { InputOptions, InputType } from '../../form/input/input.component';
import { ApiItem } from '../../api/api';
import { StockFormatDto, StockTypeDto, StockService, StockDto } from '../../api/stock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-import',
  templateUrl: './stock-import.component.html',
  styleUrls: ['./stock-import.component.scss']
})
export class StockImportComponent implements OnInit, OnDestroy {

  public formats:StockFormatDto[] = [];
  public types:StockTypeDto[] = [];
  public stockList:StockDto[] = [];
  public stockItemList:SelectItem[] = [];

  public nameOptions:InputOptions = {} as InputOptions;
  public descOptions:InputOptions = {} as InputOptions;
  public balanceOptions:InputOptions = {} as InputOptions;
  public sizeOptions:InputOptions = {} as InputOptions;
  public formatOptions:SelectOptions = {} as SelectOptions;
  public typeOptions:SelectOptions = {} as SelectOptions;

  private formatsSub:Subscription = Subscription.EMPTY;
  private typesSub:Subscription = Subscription.EMPTY;
  private stockSub:Subscription = Subscription.EMPTY;

  constructor(
    private stockService:StockService
  ) { }

  public ngOnInit():void {
    this.initOptions();
    this.initStockList();
  }

  public ngOnDestroy():void {
    this.formatsSub.unsubscribe();
    this.typesSub.unsubscribe();
    this.stockSub.unsubscribe();
  }

  private initOptions():void {
    this.nameOptions = {
      placeholder: 'Name',
      default: ''
    }
    this.descOptions = {
      placeholder: "Description",
      default: '',
      type: InputType.Textarea
    };
    this.balanceOptions = {
      placeholder: "Balance",
      default: 0,
      type: InputType.Number
    };
    this.sizeOptions = {
      placeholder: "Size",
      default: 0,
      type: InputType.Number
    };
    this.typeOptions = {
      placeholder: 'Type',
      default: '',
      items: []
    };
    this.formatOptions = {
      placeholder: 'Format',
      default: '',
      items: []
    };

    this.formatsSub = this.stockService.getFormats()
    .subscribe((res) => {
      if (res.data) {
        this.formats = res.data;
      }
      this.insertItems(this.formatOptions.items, res.data as ApiItem[]);
    });

    this.typesSub = this.stockService.getTypes()
      .subscribe((res) => {
        if (res.data) {
          this.types = res.data;
        }
        this.insertItems(this.typeOptions.items, res.data as ApiItem[]);
      });
  }

  private initStockList():void {
    this.stockSub = this.stockService.list()
      .subscribe((res) => {
        if (res.data) {
          this.stockList = res.data;
          res.data.forEach((stock:StockDto) => {
            this.stockItemList.push({
              value: stock.id,
              text: `${stock.name} - ${stock.stock_type.name} (${stock.stock_format.name} ${stock.size} ${stock.stock_format.stock_unit.name})`
            })
          })
        }
      });
  }

  private insertItems(array:SelectItem[], apiData:ApiItem[]):void {
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

}
