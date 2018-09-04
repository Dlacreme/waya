import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService, OrderDto, OrderStatus } from '../api/order.service';
import { Subscription } from 'rxjs';
import { EventService } from '../services/event.service';
import { Order } from '../models/order';
import { ProductDto, ProductService } from '../api/product.service';
import { OrderProductType } from './order.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  public orders:OrderDto[] = [];
  public pendingOrders:OrderDto[] = [];
  public validatedOrders:OrderDto[] = [];
  public readyOrders:OrderDto[] = [];

  public pickedOrder:Order|undefined;
  public products:ProductDto[] = [];
  public orderProductType:OrderProductType = OrderProductType.None;

  private ordersSub = Subscription.EMPTY;
  private updateListenerSub = Subscription.EMPTY;
  private openSub = Subscription.EMPTY;
  private openOrderProductsSub:Subscription = Subscription.EMPTY;

  constructor(
    private orderService:OrderService,
    private eventService:EventService,
    private productService:ProductService
  ) { }

  public ngOnInit():void {
    this.ordersSub = this.orderService.list()
      .subscribe((res) => {
        if (res.data) {
          this.splitOrders(res.data);
        }
      });
    this.openOrderProductsSub = this.eventService.openOrderProducts
      .subscribe((isOpen) => this.orderProductType = isOpen ? OrderProductType.Add : OrderProductType.None);
    this.listenForUpdate();
    this.products = StorageService.products;
  }

  public ngOnDestroy():void {
    this.ordersSub.unsubscribe();
    this.updateListenerSub.unsubscribe();
    this.openSub.unsubscribe();
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

  private listenForUpdate():void {
    this.updateListenerSub = this.eventService.orderUpdate
      .subscribe((order:Order) => {
        this.splitOrders(this.mergeOrders());
        this.pickedOrder = order;
      });
    this.openSub = this.eventService.openOrder
      .subscribe((order:Order) => {
        this.pickedOrder = order;
      })
  }

  private splitOrders(orders:OrderDto[]):void {
    this.orders = orders;
    this.pendingOrders = this.spliceFromStatus(OrderStatus.Pending);
    this.validatedOrders = this.spliceFromStatus(OrderStatus.Validated);
    this.readyOrders = this.spliceFromStatus(OrderStatus.Ready);
  }

  private spliceFromStatus(status:OrderStatus):OrderDto[] {
    const orders:OrderDto[] = [];
    let item = this.dig(status);
    while (item) {
      orders.push(item);
      item = this.dig(status);
    }
    return orders;
  }

  private dig(status:OrderStatus):OrderDto|null {
    for (var i = 0; i < this.orders.length ; i++) {
      if (this.orders[i].order_status_id === status) {
        return this.orders.splice(i, 1)[0];
      }
    }
    return null;
  }

  private mergeOrders():OrderDto[] {
    return [...this.orders, ...this.pendingOrders, ...this.validatedOrders, ...this.readyOrders];
  }

}
