import { Component, Input } from '@angular/core';
import { StockDto } from '../../api/stock.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {

  public data:StockDto;
  public isEditable = false;

  @Input()
  set stock(stock:StockDto) {
    this.data = stock;
  }

  constructor(
    private matSnackBar:MatSnackBar
  ) { }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }

  public afterUpdate(stock:StockDto):void {
    this.data = Object.assign(this.data, stock);
    this.isEditable = false;
    this.matSnackBar.open('Stock successfully updated', 'close', {duration: 5000});
  }

}
