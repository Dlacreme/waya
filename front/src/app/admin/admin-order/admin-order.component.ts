import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableDto, OrderService } from '../../api/order.service';
import { InputOptions } from '../../form/input/input.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';

interface OrderSubs {
  table:Subscription;
}

interface EditableTable {
  source:TableDto,
  options:InputOptions
}

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit, OnDestroy {

  public isEditable:boolean = false;

  public tables:EditableTable[] = [];
  public newTable:EditableTable;

  private dialogSub:OrderSubs = this.getEmptySubs();
  private listSub:OrderSubs = this.getEmptySubs();
  private updateSub:OrderSubs = this.getEmptySubs();
  private createSub:OrderSubs = this.getEmptySubs();
  private deleteSub:OrderSubs = this.getEmptySubs();

  constructor(
    private orderService:OrderService,
    private matSnackBar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  public ngOnInit():void {
    this.getDataLists();
    this.initNew();
  }

  public ngOnDestroy():void {
    this.unsubscribeSubs(this.dialogSub);
    this.unsubscribeSubs(this.listSub);
    this.unsubscribeSubs(this.updateSub);
    this.unsubscribeSubs(this.createSub);
    this.unsubscribeSubs(this.deleteSub);
  }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }

  // Table
  public updateTableName(table:EditableTable, value:string):void {
    table.source.name = value;
  }

  public updateTable(table:EditableTable):void {
    this.updateSub.table = this.orderService.tableUpdate(table.source)
      .subscribe(() => this.matSnackBar.open(`Table ${table.source.name} updated`, 'close'));
  }

  public createTable(table:EditableTable):void {
    this.createSub.table = this.orderService.tableCreate(table.source)
      .subscribe((res) => {
        if (res.data) {
          this.tables.push({
            source: res.data,
            options: {
              placeholder: 'Name',
              default: res.data.name
            }
          });
        }
      });
  }

  public openTableDeleteValidation(table:EditableTable):void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${table.source.name}?`
    });
    this.dialogSub.table = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub.table = this.orderService.tableDelete(table.source.id)
          .subscribe(() => {
            const index = this.tables.findIndex((item) => item.source.id === table.source.id);
            if (index !== -1) {
              this.tables.splice(index, 1);
            }
            this.matSnackBar.open(`${table.source.name} deleted.`, 'close', {duration: 5000})
          });
      }
    });
  }

  private getDataLists():void {
    this.listSub.table = this.orderService.tableList()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((item) => {
            this.tables.push({
              source: item,
              options: {
                placeholder: 'Name',
                default: item.name
              }
            })
          });
        }
      });
  }

  private initNew():void {
    this.newTable = {
      source: {
        name: ''
      } as TableDto,
      options: {
        placeholder: 'Create new Table',
        default: ''
      }
    }
  }

  private getEmptySubs():OrderSubs {
    return {
      table: Subscription.EMPTY,
    };
  }

  private unsubscribeSubs(subs:OrderSubs):void {
    subs.table.unsubscribe();
  }

}
