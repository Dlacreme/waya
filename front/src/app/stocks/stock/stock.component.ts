import { Component, OnInit, Input } from '@angular/core';
import { Stock, StockService } from '../../api/stock.service';
import { MatDialog } from '@angular/material';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';

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
    public dialog:MatDialog,
    private stockService:StockService
  ) { }

  ngOnInit() {
  }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }

  public openDeleteValidation():void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${this.data.name}?`
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.stockService.delete(this.data.id).subscribe();
      }
    });
  }



}
