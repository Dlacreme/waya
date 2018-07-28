import { Component, OnInit } from '@angular/core';
import { ProductService } from '../api/product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products:Product[] = [];

  private productSub:Subscription = Subscription.EMPTY;

  constructor(
    private productService:ProductService
  ) { }

  public ngOnInit():void {
    this.productSub = this.productService.list()
      .subscribe((res) => this.products = res.data ? res.data : []);
  }

  public ngOnDestroy():void {
    this.productSub.unsubscribe();
  }

}
