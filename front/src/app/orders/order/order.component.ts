import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../models/order';
import { ProductDto } from '../../api/product.service';
import { EventService } from '../../services/event.service';
import { Subscription, Subject } from 'rxjs';
import { OrderProduct, OrderProductType } from '../order.service';
import { OrderService, OrderDto } from '../../api/order.service';

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
  private updateSub:Subscription = Subscription.EMPTY;

  private productToAdd:number[] = [];
  private productToRemove:number[] = [];

  constructor(
    private eventService:EventService,
    private orderService:OrderService
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
    this.updateSub.unsubscribe();
  }

  public addProduct(product:ProductDto):void {
    this.data.addProduct(product);
    this.productToAdd.push(product.id);
  }

  public removeProduct(product:ProductDto, index:number):void {
    this.data.removeProduct(index);
    const existingIndex = this.productToAdd.findIndex((item) => item === product.id);
    console.log(existingIndex);
    if (existingIndex >= 0) {
      this.productToAdd.splice(existingIndex, 1);
    } else {
      this.productToRemove.push(product.id);
    }
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

  public updateProducts():void {
    this.updateSub = this.orderService.updateProducts(this.data.source, this.productToAdd, this.productToRemove)
      .subscribe((res) => {
        this.data.updateSource(res.data as OrderDto);
        this.productToAdd.splice(0,this.productToAdd.length);
        this.productToRemove.splice(0, this.productToRemove.length);
        this.resetUpdate();
      });
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
