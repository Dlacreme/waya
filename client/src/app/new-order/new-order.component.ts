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

  private products:Product[] = this.dataService.getProducts();

  constructor(
    private dataService:DataService
  ) { }

  public ngOnInit():void {

  }

  public open(isOpen:boolean):void {
    this.isOpen = isOpen;
  }

}
