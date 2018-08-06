import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockService, StockTypeDto, StockFormatDto, StockUnitDto } from '../../api/stock.service';

interface StockSubs {
  type:Subscription;
  format:Subscription;
  unit:Subscription;
}

@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.component.html',
  styleUrls: ['./admin-stock.component.scss']
})
export class AdminStockComponent implements OnInit, OnDestroy {

  public isEditable:boolean = false;

  public types:StockTypeDto[] = [];
  public formats:StockFormatDto[] = [];
  public units:StockUnitDto[] = [];

  private dialogSub:Subscription = Subscription.EMPTY;
  private listSub:StockSubs = this.getEmptyStockSubs();
  private updateSub:StockSubs = this.getEmptyStockSubs();
  private createSub:StockSubs = this.getEmptyStockSubs();
  private deleteSub:StockSubs = this.getEmptyStockSubs();

  constructor(
    private stockService:StockService
  ) { }

  public ngOnInit():void {
    this.getDataLists();
  }

  public ngOnDestroy():void {
    this.dialogSub.unsubscribe();
    this.unsubscribeSubs(this.listSub);
    this.unsubscribeSubs(this.updateSub);
    this.unsubscribeSubs(this.createSub);
    this.unsubscribeSubs(this.deleteSub);
  }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }

  private getDataLists():void {
    this.listSub.type = this.stockService.typeList()
      .subscribe((res) => {
        if (res.data) {
          this.types = res.data
        }
      });
    this.listSub.format = this.stockService.formatList()
      .subscribe((res) => {
        if (res.data) {
          this.formats = res.data
        }
      });
    this.listSub.unit = this.stockService.unitList()
      .subscribe((res) => {
        if (res.data) {
          this.units = res.data
        }
      });
  }

  private getEmptyStockSubs():StockSubs {
    return {
      type: Subscription.EMPTY,
      format: Subscription.EMPTY,
      unit: Subscription.EMPTY
    };
  }

  private unsubscribeSubs(subs:StockSubs):void {
    subs.type.unsubscribe();
    subs.format.unsubscribe();
    subs.unit.unsubscribe();
  }

}
