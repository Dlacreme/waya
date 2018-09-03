import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ProductService } from './api/product.service';
import { UserService } from './api/user.service';
import { OrderService } from './api/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    public productService:ProductService,
    public userService:UserService,
    public orderService:OrderService
  ) {
    this.initStore();
  }

  public initStore():void {
    this.productService.list()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((item) => StorageService.products.push(item));
        }
      });
    this.userService.list()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((item) => StorageService.users.push(item));
        }
      });
    this.orderService.tableList()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((item) => StorageService.tables.push(item));
        }
      });
  }
}
