import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderDto, OrderStatus, OrderService } from '../../api/order.service';
import { Order } from '../../models/order';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit, OnDestroy {

  public data:Order = {} as Order;
  public statusOptions:SelectOptions;
  public classStatus = '';

  private updateSub = Subscription.EMPTY;

  constructor(
    private eventService:EventService,
    private orderService:OrderService
  ) { }

  @Input()
  set order(order:OrderDto) {
    this.data = new Order(order);
    const lastUpdate = new Date(order.updated_at);
    if (new Date() > this.addMinutes(lastUpdate, 30)) {
      this.classStatus = 'status-urgent';
    } else if (new Date() > this.addMinutes(lastUpdate, 15)) {
      this.classStatus = 'status-warning';
    } else {
      this.classStatus = 'status-ok';
    }
  }

  public ngOnInit():void {
    this.initStatusPicker();
  }

  public ngOnDestroy():void {
    this.updateSub.unsubscribe();
  }

  public openDetails():void {
    this.eventService.openOrder.emit(this.data);
  }

  public updateStatus(value:OrderStatus|null):void {
    if (!value) {
      return;
    }
    this.updateSub = this.orderService.updateStatus(this.data.source, value)
      .subscribe((res) => {
        if (res.data) {
          this.data.setStatus(value);
          this.data.updateSource(res.data);
          this.eventService.orderUpdate.emit(this.data);
        }
      });
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

  private addMinutes(date, minutes):Date {
    return new Date(date.getTime() + minutes*60000);
}

}
