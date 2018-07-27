import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../../api/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  public data:Stock;
  public isEditable = false;

  @Input()
  set stock(stock:Stock) {
    this.data = stock;
  }

  constructor(
  ) { }

  ngOnInit() {
  }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }

}
