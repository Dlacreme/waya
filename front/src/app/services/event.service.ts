import { EventEmitter, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { OrderProduct } from '../orders/order.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  loaderInProgress = new EventEmitter<boolean>();
  errorOccured = new EventEmitter<string>();
  orderUpdate = new EventEmitter<Order>();
  openOrder = new EventEmitter<Order>();
  updateProducts = new EventEmitter<OrderProduct>();
}
