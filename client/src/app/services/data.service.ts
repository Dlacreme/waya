import { Injectable, OnDestroy } from '@angular/core';
import { ProductDto, ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private products:Product[];

  private getProductsSub = Subscription.EMPTY;

  constructor(
    private productService:ProductService
  ) {
    this.getProductsSub = this.productService.list()
      .subscribe((res) => (res.data as ProductDto[]).forEach((item) => this.products.push(
        new Product(item))));
  }

  public ngOnDestroy():void {
    this.getProductsSub.unsubscribe();
  }

  public getProducts():Product[] {
    return this.products;
  }

}
