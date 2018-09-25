import { Injectable, OnDestroy } from '@angular/core';
import { ProductDto, ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { TableDto, OrderService } from './order.service';
import { UserDto, UserService, FriendDto } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private cart:Product[] = [];
  private products:Product[] = [];
  private tables:TableDto[] = [];
  private users:UserDto[] = [];
  private friends:FriendDto[] = [];

  private getProductsSub = Subscription.EMPTY;
  private getTableSub = Subscription.EMPTY;
  private getUserSub = Subscription.EMPTY;
  private getFriendsSub = Subscription.EMPTY;

  constructor(
    private productService:ProductService,
    private orderService:OrderService,
    private userService:UserService
  ) {
    this.getProductsSub = this.productService.list()
      .subscribe((res) => (res.data as ProductDto[]).forEach((item) => this.products.push(
        new Product(item))));
    this.getTableSub = this.orderService.tableList()
      .subscribe((res) => (res.data as TableDto[]).forEach((item) => this.tables.push(
        item
      )));
    this.getUserSub= this.userService.list()
      .subscribe((res) => (res.data as UserDto[]).forEach((item) => this.users.push(item)));
    this.getUserSub= this.userService.friends()
      .subscribe((res) => (res.data as FriendDto[]).forEach((item) => this.friends.push(item)));
  }

  public ngOnDestroy():void {
    this.getProductsSub.unsubscribe();
    this.getTableSub.unsubscribe();
    this.getUserSub.unsubscribe();
    this.getFriendsSub.unsubscribe();
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

  public getUsers():UserDto[] {
    return this.users
  }

  public getFriends():FriendDto[] {
    return this.friends;
  }

  public removeFromCart(productId:number):void {
    const index = this.cart.findIndex((item) => item.id === productId);
    if (index >= 0) {
      this.cart.splice(index, 1);
    }
  }

}
