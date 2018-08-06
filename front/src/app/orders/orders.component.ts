import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService, OrderDto, OrderStatus } from '../api/order.service';
import { Subscription } from 'rxjs';
import { EventService } from '../services/event.service';

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

  private ordersSub = Subscription.EMPTY;
  private updateListenerSub = Subscription.EMPTY;

  constructor(
    private orderService:OrderService,
    private eventService:EventService
  ) { }

  public ngOnInit():void {
    this.ordersSub = this.orderService.list()
      .subscribe((res) => {
        if (res.data) {
          this.splitOrders(res.data);
        }
      });
    this.listenForUpdate();
  }

  public ngOnDestroy():void {
    this.ordersSub.unsubscribe();
  }

  private listenForUpdate():void {
    this.updateListenerSub = this.eventService.orderUpdate
      .subscribe((order:OrderDto) => this.splitOrders(this.mergeOrders()));
  }

  private splitOrders(orders:OrderDto[]):void {
    this.orders = orders;
    this.pendingOrders = this.spliceFromStatus(OrderStatus.Pending);
    this.validatedOrders = this.spliceFromStatus(OrderStatus.Validated);
    this.readyOrders = this.spliceFromStatus(OrderStatus.Ready);
  }

  private spliceFromStatus(status:OrderStatus):OrderDto[] {
    const orders:OrderDto[] = [];

    for (var i = 0; i < this.orders.length ; i++) {
      if (this.orders[i].order_status_id === status) {
        orders.push(this.orders.splice(i, 1)[0]);
      }
    }

    return orders;
  }

  private mergeOrders():OrderDto[] {
    return [...this.orders, ...this.pendingOrders, ...this.validatedOrders, ...this.readyOrders];
  }

}
