import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableDto, OrderService } from '../../api/order.service';
import { InputOptions } from '../../form/input/input.component';
import { MatDialog, MatSnackBar } from '@angular/material';

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
