import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  private data:Product = {} as Product;

  @Input()
  set product(product:Product) {
    this.data = product;
  }

  constructor(
    private dataService:DataService
  ) { }

  public addToCart():void {
    this.dataService.getCart().push(this.data);
  }

}
