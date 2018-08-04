import { Component, OnInit, Input } from '@angular/core';
import { OrderDto } from '../../api/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public data:OrderDto[] = [];

  public label:string;

  constructor() { }

  @Input()
  set orders(orders:OrderDto[]) {
    this.data = orders;
  }

  @Input()
  set title(title:string) {
    this.label = title;
  }

  public ngOnInit():void {
  }

}
