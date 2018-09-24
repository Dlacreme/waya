import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  public isOpen = false;
  public search = '';

  private products:Product[] = this.dataService.getProducts();

  constructor(
    private dataService:DataService
  ) { }

  public ngOnInit():void {

  }

  public open(isOpen:boolean):void {
    this.isOpen = isOpen;
  }

  public matchSearch(product:Product):boolean {
    if (!this.search) {
      return true;
    }
    return (
      product.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
      product.category.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
    );
  }

}
