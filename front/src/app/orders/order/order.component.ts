import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../models/order';
import { ProductDto } from '../../api/product.service';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';
import { OrderProduct, OrderProductType } from '../order.service';

interface Update {
  table:boolean;
  customer:boolean;
  products:boolean;
  any:boolean;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public data:Order;
  public orderProductType = OrderProductType.None;
  public update:Update;

  private addProductSub:Subscription = Subscription.EMPTY;

  constructor(
    private eventService:EventService
  ) { }

  @Input()
  set order(order:Order) {
    this.data = order;
  }

  public ngOnInit():void {
    this.listenProductAdd();
    this.resetUpdate();
  }

  public ngOnDestroy():void {
    this.addProductSub.unsubscribe();
  }

  public addProduct(product:ProductDto):void {
    this.data.addProduct(product);
  }

  public removeProduct(product:ProductDto, index:number):void {
    this.data.removeProduct(index);
  }

  public openTableUpdate():void {
    this.resetUpdate();
    this.update.table = true;
    this.update.any = true;
  }

  public openCustomerUpdate():void {
    this.resetUpdate();
    this.update.customer = true;
    this.update.any = true;
  }

  public openProductUpdate():void {
    this.resetUpdate();
    this.update.products = true;
    this.update.any = true;
    this.orderProductType = OrderProductType.Remove;
    this.eventService.openOrderProducts.emit(true);
  }

  public closeProductUpdate():void {
    this.orderProductType = OrderProductType.None;
    this.eventService.openOrderProducts.emit(false);
  }

  public resetUpdate():void {
    this.closeProductUpdate();
    this.update = {
      table: false,
      customer: false,
      products: false,
      any: false
    };
  }

  private listenProductAdd():void {
    this.addProductSub = this.eventService.updateProducts
      .subscribe((item:OrderProduct) => {
        if (item.type === OrderProductType.Add) {
          this.addProduct(item.product);
        }
      });
  }

}
