import { Injectable, OnDestroy } from '@angular/core';
import { ProductDto, ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { TableDto, OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private cart:Product[] = [];
  private products:Product[] = [];
  private tables:TableDto[] = [];

  private getProductsSub = Subscription.EMPTY;
  private getTableSub = Subscription.EMPTY;

  constructor(
    private productService:ProductService,
    private orderService:OrderService
  ) {
    this.getProductsSub = this.productService.list()
      .subscribe((res) => (res.data as ProductDto[]).forEach((item) => this.products.push(
        new Product(item))));
    this.getTableSub = this.orderService.tableList()
        .subscribe((res) => (res.data as TableDto[]).forEach((item) => this.tables.push(
          item
        )));
  }

  public ngOnDestroy():void {
    this.getProductsSub.unsubscribe();
    this.getTableSub.unsubscribe();
  }

  public getProducts():Product[] {
    return this.products;
  }

  public getTables():TableDto[] {
    return this.tables;
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
