import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ProductService } from './api/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    public productService:ProductService
  ) {
    this.initStore();
  }


  public initStore():void {
    this.productService.list()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((item) => {
            StorageService.products.push(item);
          })
        }
      })
  }
}
