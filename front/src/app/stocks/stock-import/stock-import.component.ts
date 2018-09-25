import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { InputOptions, InputType } from '../../form/input/input.component';
import { ApiItem } from '../../api/api';
import { StockFormatDto, StockTypeDto, StockService, StockDto } from '../../api/stock.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface ImportStock {
  stock:StockDto;
  importOptions:InputOptions;
  import:number;
}

@Component({
  selector: 'app-stock-import',
  templateUrl: './stock-import.component.html',
  styleUrls: ['./stock-import.component.scss']
})
export class StockImportComponent implements OnInit, OnDestroy {

  public stocks:ImportStock[] = [];

  public formats:StockFormatDto[] = [];
  public types:StockTypeDto[] = [];
  public stockList:StockDto[] = [];
  public stockItemList:SelectItem[] = [];
  public pickedStock:StockDto;
  public manualStock:StockDto = {} as StockDto;

  public nameOptions:InputOptions = {} as InputOptions;
  public descOptions:InputOptions = {} as InputOptions;
  public balanceOptions:InputOptions = {} as InputOptions;
  public sizeOptions:InputOptions = {} as InputOptions;
  public formatOptions:SelectOptions = {} as SelectOptions;
  public typeOptions:SelectOptions = {} as SelectOptions;
  public stockListOptions:SelectOptions = {} as SelectOptions;

  private formatsSub:Subscription = Subscription.EMPTY;
  private typesSub:Subscription = Subscription.EMPTY;
  private stockSub:Subscription = Subscription.EMPTY;
  private stockDetailsSub:Subscription = Subscription.EMPTY;
  private importSub:Subscription = Subscription.EMPTY;

  constructor(
    private router:Router,
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
    this.stockDetailsSub.unsubscribe();
    this.importSub.unsubscribe();
  }

  public import():void {
    const stocks:StockDto[] = [];
    this.stocks.forEach((item) => {
      stocks.push(item.stock);
    });
    this.importSub = this.stockService.import(stocks)
      .subscribe((res) => this.router.navigate(['staff/stocks']));
  }

  public updateImportNumber(stock:ImportStock, number:number):void {
    stock.import = number;
  }

  public removeFromImport(stockIndex):void {
    this.stocks.splice(stockIndex, 1);
  }

  public pickStock(stock:SelectItem):void {
    const stockItem = this.stockList.find((item) => item.id == stock.value);
    if (stockItem) {
      this.pickedStock = stockItem;
    }
  }

  public updateName(value:any):void {
    this.manualStock.name = value;
  }

  public updateDesc(value:any):void {
    this.manualStock.desc = value;
  }

  public updateSize(value:any):void {
    this.manualStock.size = value;
  }

  public updateType(value:SelectItem):void {
    this.manualStock.stock_type_id = value.value;
    const type = this.types.find((item) => item.id === value.value);
    if (type) {
      this.manualStock.stock_type = type;
    }
  }

  public updateFormat(value:SelectItem):void {
    this.manualStock.stock_format_id = value.value;
    const format = this.formats.find((item) => item.id === value.value);
    if (format) {
      this.manualStock.stock_format = format;
    }
  }

  public pushManual():void {
    this.stocks.push(this.toImportStock(this.manualStock));
  }

  public pushExisting():void {
    this.stocks.push(this.toImportStock(this.pickedStock));
  }

  private toImportStock(stock:StockDto):ImportStock {
    return {
      stock: JSON.parse(JSON.stringify(stock)),
      importOptions: {
        placeholder: 'Import Number',
        default: 0
      },
      import: 0
    };
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
    this.stockListOptions = {
      placeholder: 'Stock',
      default: '',
      items: this.stockItemList
    };
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
