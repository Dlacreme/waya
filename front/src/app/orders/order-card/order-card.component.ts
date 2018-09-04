import { Component, OnInit, Input } from '@angular/core';
import { OrderDto, OrderStatus } from '../../api/order.service';
import { Order } from '../../models/order';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  public data:Order = {} as Order;

  public statusOptions:SelectOptions;

  constructor(
    private eventService:EventService
  ) { }

  @Input()
  set order(order:OrderDto) {
    this.data = new Order(order);
  }

  public ngOnInit():void {
    this.initStatusPicker();
  }

  public openDetails():void {
    this.eventService.openOrder.emit(this.data);
  }

  public updateStatus(value:OrderStatus|null):void {
    if (!value) {
      return;
    }
    this.data.setStatus(value);
    this.eventService.orderUpdate.emit(this.data);
  }

  public prevStatus():OrderStatus|null {
    switch (this.data.status) {
      case OrderStatus.Validated:
        return OrderStatus.Pending;
      case OrderStatus.Ready:
        return OrderStatus.Validated;
      case OrderStatus.Delivered:
        return OrderStatus.Ready;
    }
    return null;
  }

  public nextStatus():OrderStatus|null {
    switch (this.data.status) {
      case OrderStatus.Pending:
        return OrderStatus.Validated;
      case OrderStatus.Validated:
        return OrderStatus.Ready;
      case OrderStatus.Ready:
        return OrderStatus.Delivered;
    }
    return null;
  }

  private initStatusPicker():void {
    this.statusOptions = {
      placeholder: 'Pick new status',
      default: this.data.status,
      items: [{
        value: OrderStatus.Pending,
        text: 'Pending'
      }, {
        value: OrderStatus.Validated,
        text: 'Validated'
      }, {
        value: OrderStatus.Ready,
        text: 'Ready'
      }, {
        value: OrderStatus.Delivered,
        text: 'On Going'
      }]
    };
  }

}
