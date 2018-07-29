import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Compo } from '../../models/product';
import { StockDto, StockService } from '../../api/stock.service';
import { SelectItem, SelectOptions } from '../../form/select/select.component';
import { Subscription } from 'rxjs';
import { InputType, InputOptions } from '../../form/input/input.component';

@Component({
  selector: 'app-compo-edit',
  templateUrl: './compo-edit.component.html',
  styleUrls: ['./compo-edit.component.scss']
})
export class CompoEditComponent implements OnInit, OnDestroy {

  public data:Compo[] = [];
  public stockList:StockDto[] = [];
  public stockItemList:SelectItem[] = [];
  public compoListOptions:SelectOptions = {} as SelectOptions;
  public compoQuantityOptions:InputOptions = {} as InputOptions;
  public tmpCompo:Compo = {} as Compo;

  private stockSub:Subscription = Subscription.EMPTY;

  @Output() onchange = new EventEmitter();

  @Input()
  set compo(compo:Compo[]) {
    this.data = compo;
    this.initInputs();
  }

  constructor(
    private stockService:StockService
  ) { }

  public ngOnInit():void {
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

  public ngOnDestroy():void {
    this.stockSub.unsubscribe();
  }

  public updateStock(stock:SelectItem):void {
    const stockItem = this.stockList.find((item) => item.id === stock.value);
    if (stockItem) {
      this.tmpCompo.stock = stockItem;
    }
  }

  public updateQuantity(quantity:any):void {
    this.tmpCompo.quantity = quantity;
  }

  public addCompo():void {
    if (this.tmpCompo && this.tmpCompo.stock && this.tmpCompo.quantity) {
      this.compoListOptions.default = '';
      this.compoQuantityOptions.default = '';
      this.data.push(this.tmpCompo);
      this.submit();
    }
  }

  public deleteCompo(compo:any):void {
    const compoIndex = this.data.findIndex((item) => item.id === compo.id);
    if (compoIndex != -1) {
      this.data.splice(compoIndex, 1);
    }
  }

  public submit():void {
    this.onchange.emit(this.data);
  }

  private initInputs():void {
    this.compoListOptions = {
      placeholder: 'Stock',
      default: '',
      items: this.stockItemList
    };
    this.compoQuantityOptions = {
      placeholder: 'Quantity',
      default: '',
      type: InputType.Number
    };
  }

}
