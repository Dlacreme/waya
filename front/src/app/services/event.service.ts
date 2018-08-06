import { EventEmitter, Injectable } from '@angular/core';
import { OrderDto } from '../api/order.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  loaderInProgress = new EventEmitter<boolean>();
  errorOccured = new EventEmitter<string>();
  orderUpdate = new EventEmitter<OrderDto>();
}
