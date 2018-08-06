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

  public updateStatus(value:SelectItem):void {
    this.data.setStatus(value.value);
    this.eventService.orderUpdate.emit(this.data.source);
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
