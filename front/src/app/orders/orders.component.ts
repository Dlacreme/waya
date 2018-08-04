import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../api/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  private ordersSub = Subscription.EMPTY;

  constructor(
    private orderService:OrderService
  ) { }

  public ngOnInit():void {
    this.ordersSub = this.orderService.list()
      .subscribe((res) => console.log('ORDERS > ', res));
  }

  public ngOnDestroy():void {
    this.ordersSub.unsubscribe();
  }

}
