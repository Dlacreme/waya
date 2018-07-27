import { Component, Input } from '@angular/core';
import { Stock } from '../../api/stock.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {

  public data:Stock;
  public isEditable = false;

  @Input()
  set stock(stock:Stock) {
    this.data = stock;
  }

  constructor(
    private matSnackBar:MatSnackBar
  ) { }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }

  public afterUpdate(stock:Stock):void {
    this.isEditable = false;
    this.matSnackBar.open('Stock successfully updated', 'close', {duration: 5000});
  }

}
