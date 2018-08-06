import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductDto } from '../../api/product.service';
import { OrderProductType } from '../order.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

  public data:ProductDto = {} as ProductDto;
  public orderProductType:OrderProductType|undefined;
  public orderProductTypeEnum = OrderProductType;

  @Output() onremove = new EventEmitter();
  @Output() onadd = new EventEmitter();

  @Input()
  set product(product:ProductDto) {
    this.data = product;
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
