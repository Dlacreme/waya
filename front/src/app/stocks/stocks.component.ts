import { Component, OnInit } from '@angular/core';
import { StockService, Stock } from '../api/stock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  public stocks:Stock[] = [];
  public stockSubscription:Subscription = Subscription.EMPTY;

  constructor(
    private StockService:StockService
  ) { }

  ngOnInit() {
    this.stockSubscription = this.StockService.get()
      .subscribe((result) => this.stocks = result.data ? result.data : []);
  }

}
