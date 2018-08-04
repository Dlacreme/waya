import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService, OrderDto, OrderStatus } from '../api/order.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private orderService:OrderService
  ) { }

  public ngOnInit():void {
    this.ordersSub = this.orderService.list()
      .subscribe((res) => {
        if (res.data) {
          this.orders = res.data;
          this.pendingOrders = this.spliceFromStatus(OrderStatus.Pending);
          this.validatedOrders = this.spliceFromStatus(OrderStatus.Pending);
          this.readyOrders = this.spliceFromStatus(OrderStatus.Pending);
        }
      });
  }

  public ngOnDestroy():void {
    this.ordersSub.unsubscribe();
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

}
