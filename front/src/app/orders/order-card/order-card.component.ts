import { Component, OnInit, Input } from '@angular/core';
import { OrderDto } from '../../api/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  public data:Order = {} as Order;

  constructor() { }

  @Input()
  set order(order:OrderDto) {
    this.data = new Order(order);
  }

  ngOnInit() {
  }

}
