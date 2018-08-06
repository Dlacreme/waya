import { Injectable, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs';

export enum OrderProductType {
  Add = 1,
  Remove = -1
}

export interface OrderProduct {
  type:OrderProductType;
  order:Order;
  product:Product;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy {

  private updateSub = Subscription.EMPTY;

  constructor(
    private eventService:EventService
  ) {
    this.initUpdateSub();
  }

  public ngOnDestroy():void {
    this.updateSub.unsubscribe();
  }

  private initUpdateSub():void {
    this.updateSub = this.eventService.updateProducts
      .subscribe((item) => {
        console.log('DO > ', item);
      });
  }

}
