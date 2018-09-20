import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products:Product[] = this.dataService.getCart();

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit() {
  }

  public removeItem(product:Product):void {
    this.dataService.removeFromCart(product.id);
  }

}
