import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService, OrderDto, OrderStatus } from '../api/order.service';
import { Subscription } from 'rxjs';
import { EventService } from '../services/event.service';
import { Order } from '../models/order';
import { ProductDto, ProductService } from '../api/product.service';
import { OrderProductType } from './order.service';
import { StorageService } from '../services/storage.service';

interface OrderList {
  status: OrderStatus,
  items: OrderDto[],
  display: boolean
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  public orders:OrderDto[] = [];
  public lists:OrderList[];
  public orderStatus:any = OrderStatus;

  public pickedOrder:Order|undefined;
  public products:ProductDto[] = [];
  public orderProductType:OrderProductType = OrderProductType.None;

  private ordersSub = Subscription.EMPTY;
  private updateListenerSub = Subscription.EMPTY;
  private openSub = Subscription.EMPTY;
  private createSub = Subscription.EMPTY;
  private openOrderProductsSub:Subscription = Subscription.EMPTY;

  constructor(
    private orderService:OrderService,
    private eventService:EventService,
    private productService:ProductService
  ) { }

  public ngOnInit():void {
    this.initLists();
    this.load();
    this.openOrderProductsSub = this.eventService.openOrderProducts
      .subscribe((isOpen) => this.orderProductType = isOpen ? OrderProductType.Add : OrderProductType.None);
    this.listenForUpdate();
    this.products = StorageService.products;
  }

  public ngOnDestroy():void {
    this.ordersSub.unsubscribe();
    this.updateListenerSub.unsubscribe();
    this.openSub.unsubscribe();
    this.createSub.unsubscribe();
    this.openOrderProductsSub.unsubscribe();
  }

  public addProduct(product:ProductDto):void {
    if (this.pickedOrder) {
      this.eventService.updateProducts.emit({
        type: OrderProductType.Add,
        order: this.pickedOrder,
        product: product,
      });
    }
  }

  public new():void {
    this.orderService.create()
      .subscribe(() => {this.refresh()});
  }

  public refresh():void {
    this.orders.splice(0, this.orders.length);
    this.lists.forEach((item) => item.items.splice(0, item.items.length));
    this.load();
  }

  private load():void {
    this.orderService.list()
      .subscribe((res) => {
        if (res.data) {
          this.splitOrders(res.data);
        }
      });
  }

  private listenForUpdate():void {
    this.updateListenerSub = this.eventService.orderUpdate
      .subscribe((order:Order) => {
        this.refresh();
      });
    this.openSub = this.eventService.openOrder
      .subscribe((order:Order) => {
        this.pickedOrder = order;
      });
  }

  private splitOrders(orders:OrderDto[]):void {
    this.orders.splice(0, this.orders.length);
    orders.forEach((item) => {
      this.orders.push(item);
      const list = this.lists.find((l) => l.status === (item.order_status_id as OrderStatus));
      if (list) {
        list.items.push(item);
      }
    });
    this.lists.forEach((item) => item.display = item.items.length > 0)
  }

  private initLists():void {
    this.lists = [];
    Object.keys(OrderStatus).map(key => {
      const nKey = Number(key);
      if (!isNaN(nKey)) {
        this.lists.push({
          status: (nKey as OrderStatus),
          items: [],
          display: true
        });
      }
    });
  }

}
