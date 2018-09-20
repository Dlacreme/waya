import { Injectable, OnDestroy } from '@angular/core';
import { ProductDto, ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private cart:Product[] = [];
  private products:Product[] = [];

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

  public getCart():Product[] {
    return this.cart;
  }

  public removeFromCart(productId:number):void {
    const index = this.cart.findIndex((item) => item.id === productId);
    if (index >= 0) {
      this.cart.splice(index, 1);
    }
  }

}
