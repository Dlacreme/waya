import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductDto } from '../../api/product.service';
import { OrderProductType } from '../order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

  public data:ProductDto = {} as ProductDto;
  public dataOrder:Order;
  public orderProductType:OrderProductType|undefined;
  public orderProductTypeEnum = OrderProductType;

  @Output() onremove = new EventEmitter();
  @Output() onadd = new EventEmitter();

  @Input()
  set product(product:ProductDto) {
    this.data = product;
    console.log(this.data);
  }

  @Input()
  set order(order:Order) {
    this.dataOrder = order;
  }

  @Input()
  set type(type:OrderProductType) {
    this.orderProductType = type;
  }

  constructor() { }

  ngOnInit() {
  }

  public add():void {
    this.onadd.emit(this.data);
  }

  public remove():void {
    this.onremove.emit(this.data);
  }

}
