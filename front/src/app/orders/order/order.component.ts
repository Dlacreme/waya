import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public data:Order;

  constructor() { }

  @Input()
  set order(order:Order) {
    this.data = order;
  }

  public ngOnInit():void {

  }

}
