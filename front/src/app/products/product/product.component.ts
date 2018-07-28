import { Component, OnInit, Input } from '@angular/core';
import { ProductDto } from '../../api/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public data:Product;
  public canEdit = false;
  public isEditable = false;

  @Input()
  set product(product:ProductDto) {
    this.data = new Product(product);
    console.log(this.data);
  }

  @Input()
  set editable(canEdit:boolean) {
    this.canEdit = canEdit;
  }

  constructor() { }

  ngOnInit() {
  }

}
