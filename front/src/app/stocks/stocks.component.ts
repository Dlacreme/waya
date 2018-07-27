import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService, Stock } from '../api/stock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit, OnDestroy {

  public stocks:Stock[] = [];
  public stockSubscription:Subscription = Subscription.EMPTY;

  constructor(
    private StockService:StockService
  ) { }

  public ngOnInit():void {
    this.stockSubscription = this.StockService.list()
      .subscribe((result) => this.stocks = result.data ? result.data : []);
  }

  public ngOnDestroy():void {
    this.stockSubscription.unsubscribe();
  }

}
