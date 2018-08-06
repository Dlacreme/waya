import { Injectable, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs';
import { ProductDto } from '../api/product.service';
import { TableDto } from '../api/order.service';

export enum OrderProductType {
  Add = 1,
  None = 0,
  Remove = -1
}

export interface OrderProduct {
  type:OrderProductType;
  order:Order;
  product:ProductDto;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy {

  private updateSub = Subscription.EMPTY;

  constructor(
    private eventService:EventService
  ) {
  }

  public ngOnDestroy():void {
    this.updateSub.unsubscribe();
  }


}
