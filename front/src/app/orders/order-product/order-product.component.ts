import { Component, OnInit, Input } from '@angular/core';
import { ProductDto } from '../../api/product.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

  public data:ProductDto = {} as ProductDto;

  @Input()
  set product(product:ProductDto) {
    this.data = product;
    console.log(this.data);
  }

  constructor() { }

  ngOnInit() {
  }

}
