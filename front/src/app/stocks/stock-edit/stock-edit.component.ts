import { Component, OnInit, Input } from '@angular/core';
import { Stock, StockService } from '../../api/stock.service';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  public data:Stock;

  constructor(
    public stockService:StockService,
    public dialog:MatDialog,
  ) { }

  @Input()
  set stock(stock:Stock) {
    this.data = stock;
  }

  ngOnInit() {
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
