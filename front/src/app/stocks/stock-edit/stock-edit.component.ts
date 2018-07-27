import { Component, OnInit, Input } from '@angular/core';
import { Stock, StockService } from '../../api/stock.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  public data:Stock;

  constructor() { }

  @Input()
  set stock(stock:Stock) {
    this.data = stock;
  }

  ngOnInit() {
  }

}
