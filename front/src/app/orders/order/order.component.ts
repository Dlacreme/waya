import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../models/order';
import { ProductDto } from '../../api/product.service';
import { EventService } from '../../services/event.service';
import { Subscription, Subject } from 'rxjs';
import { OrderProduct, OrderProductType } from '../order.service';
import { OrderService, OrderDto, OrderStatus, PaymentMethod } from '../../api/order.service';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { StorageService } from '../../services/storage.service';

interface Update {
  status:boolean;
  table:boolean;
  customer:boolean;
  products:boolean;
  any:boolean;
  payment:boolean;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public data:Order;
  public orderProductType = OrderProductType.None;
  public update:Update;
  public statusOptions:SelectOptions;
  public statusItems:SelectItem[] = [];
  public tableOptions:SelectOptions;
  public tableItems:SelectItem[] = [];
  public customerOptions:SelectOptions;
  public customerItems:SelectItem[] = [];
  public pickedTable:SelectItem|undefined;
  public pickedCustomer:SelectItem|undefined;
  public pickedStatus:SelectItem|undefined;
  public paymentMethodOptions:SelectOptions;
  public pickedPaymentMethod:SelectItem|undefined;

  private addProductSub:Subscription = Subscription.EMPTY;
  private updateStatusSub:Subscription = Subscription.EMPTY;
  private updateTableSub:Subscription = Subscription.EMPTY;
  private updateCustomerSub:Subscription = Subscription.EMPTY;
  private updateProductsSub:Subscription = Subscription.EMPTY;
  private paymentSub:Subscription = Subscription.EMPTY;

  private productToAdd:number[] = [];
  private productToRemove:number[] = [];

  constructor(
    private eventService:EventService,
    private orderService:OrderService
  ) { }

  @Input()
  set order(order:Order) {
    this.data = order;
  }

  public ngOnInit():void {
    this.listenProductAdd();
    this.initOptions();
    this.resetUpdate();
  }

  public ngOnDestroy():void {
    this.addProductSub.unsubscribe();
    this.updateCustomerSub.unsubscribe();
    this.updateTableSub.unsubscribe();
    this.updateProductsSub.unsubscribe();
    this.paymentSub.unsubscribe();
  }

  public addProduct(product:ProductDto):void {
    this.data.addProduct(product);
    this.productToAdd.push(product.id);
  }

  public removeProduct(product:ProductDto, index:number):void {
    this.data.removeProduct(index);
    const existingIndex = this.productToAdd.findIndex((item) => item === product.id);
    if (existingIndex >= 0) {
      this.productToAdd.splice(existingIndex, 1);
    } else {
      this.productToRemove.push(product.id);
    }
  }

  public openStatusUpdate():void {
    this.resetUpdate();
    this.update.status = true;
    this.update.any = true;
  }

  public openTableUpdate():void {
    this.resetUpdate();
    this.update.table = true;
    this.update.any = true;
  }

  public openCustomerUpdate():void {
    this.resetUpdate();
    this.update.customer = true;
    this.update.any = true;
  }

  public openPayment():void {
    this.resetUpdate();
    this.update.payment = true;
    this.update.any = true;
  }

  public openProductUpdate():void {
    this.resetUpdate();
    this.update.products = true;
    this.update.any = true;
    this.orderProductType = OrderProductType.Remove;
    this.eventService.openOrderProducts.emit(true);
  }

  public closeProductUpdate():void {
    this.orderProductType = OrderProductType.None;
    this.eventService.openOrderProducts.emit(false);
  }

  public updateProducts():void {
    this.updateProductsSub = this.orderService.updateProducts(this.data.source, this.productToAdd, this.productToRemove)
      .subscribe((res) => {
        this.data.updateSource(res.data as OrderDto);
        this.productToAdd.splice(0,this.productToAdd.length);
        this.productToRemove.splice(0, this.productToRemove.length);
        this.resetUpdate();
      });
  }

  public syncStatus():void {
    if (!this.pickedStatus) {
      return;
    }
    this.updateStatusSub = this.orderService.updateStatus(this.data.source, this.pickedStatus.value)
      .subscribe((res) => {
        this.data.updateSource(res.data as OrderDto);
        this.statusOptions.default = this.data.source.order_status_id;
        this.resetUpdate();
        this.eventService.orderUpdate.emit(this.data);
      });
  }

  public syncTable():void {
    if (!this.pickedTable) {
      return;
    }
    this.updateTableSub = this.orderService.updateTable(this.data.source, this.pickedTable.value)
      .subscribe((res) => {
        this.data.updateSource(res.data as OrderDto);
        this.tableOptions.default = this.data.source.table_id;
        this.resetUpdate();
      });
  }

  public syncCustomer():void {
    if (!this.pickedCustomer) {
      return;
    }
    this.updateCustomerSub = this.orderService.updateCustomer(this.data.source, this.pickedCustomer.value)
      .subscribe((res) => {
        this.data.updateSource(res.data as OrderDto);
        this.customerOptions.default = this.data.source.customer_id;
        this.resetUpdate();
      });
  }

  public updateStatus(item:SelectItem):void {
    this.pickedStatus = item;
  }

  public updateTable(item:SelectItem):void {
    this.pickedTable = item;
  }

  public updateCustomer(item:SelectItem):void {
    this.pickedCustomer = item;
  }

  public updatePaymentMethod(item:SelectItem):void {
    this.pickedPaymentMethod = item;
  }

  public confirmPayment():void {
    if (!this.pickedPaymentMethod) {
      return;
    }
    const paymentSub = this.orderService.payment(this.data.id, this.pickedPaymentMethod.value)
      .subscribe((res) => {
        this.eventService.orderUpdate.emit(this.data);
        console.log(res);
      });
  }

  public resetUpdate():void {
    this.closeProductUpdate();
    this.update = {
      status: false,
      table: false,
      customer: false,
      products: false,
      any: false,
      payment: false
    };
  }

  public displayDate(date:string):string {
    return date.split('T')[1].substr(0, 5);
  }

  private listenProductAdd():void {
    this.addProductSub = this.eventService.updateProducts
      .subscribe((item:OrderProduct) => {
        if (item.type === OrderProductType.Add) {
          this.addProduct(item.product);
        }
      });
  }

  private initOptions():void {
    this.pushToSelectItems(OrderStatus, this.statusItems);
    this.tableItems.push({
      text: 'None',
      value: -1
    });
    this.customerItems.push({
      text: 'None',
      value: -1
    });
    StorageService.tables.forEach((item) => this.tableItems.push({
      text: item.name,
      value: item.id
    }));
    this.statusOptions = {
      placeholder: 'Status',
      default: OrderStatus[this.data.status],
      items: this.statusItems
    };
    this.tableOptions = {
      placeholder: 'Table',
      default: this.data.table ? this.data.table.id : -1,
      items: this.tableItems
    };
    StorageService.users.forEach((item) => this.customerItems.push({
      text: item.username,
      value: item.id
    }));
    this.customerOptions = {
      placeholder: 'Customer',
      default: this.data.customer ? this.data.customer.id : -1,
      items: this.customerItems
    };
    this.paymentMethodOptions = {
      placeholder: 'Payment',
      items: []
    };
    this.pushToSelectItems(PaymentMethod, this.paymentMethodOptions.items);
  }

  private pushToSelectItems(obj:any, a:SelectItem[]):SelectItem[] {
    Object.keys(obj).forEach((key) => {
      if (isNaN(Number(key))) {return;}
      a.push({
        text: obj[key],
        value: key
      });
    });
    return a;
  }

}
