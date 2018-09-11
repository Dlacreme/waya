import { OrderDto, OrderStatus, TableDto, PaymentMethod } from "../api/order.service";
import { ProductDto, ProductService } from "../api/product.service";
import { User, UserDto } from "./user";
import { StorageService } from "../services/storage.service";

export class Order {

  source:OrderDto;

  id:number;
  products:ProductDto[];
  customer:User|null;
  status:OrderStatus;
  price:number;
  table:TableDto|null;
  isPaid:boolean;

  created_at:Date;
  updated_at:Date;

  constructor(order:OrderDto) {
    this.updateSource(order);
  }

  public updateSource(order:OrderDto):void {
    this.source = order;

    this.id = order.id;
    this.products = [];
    order.products.forEach((item) => {
      this.products.push(StorageService.products.find((pdt) => item.id === pdt.id) as ProductDto);
    });

    this.customer = order.customer_id ? new User(<UserDto>order.customer) : null;
    this.status = order.order_status_id;
    this.price = order.total_price || 0;
    this.table = order.table || null;

    this.created_at = order.created_at;
    this.updated_at = order.updated_at;
    this.isPaid = order.paid_at != null;
  }

  public setStatus(status:OrderStatus, comment:string|undefined = undefined):void {
    this.status = status;
    this.source.order_status_id = status;
  }

  public addProduct(product:ProductDto):void {
    this.source.products.push(product);
    this.products.push(product);
  }

  public removeProduct(productIndex:number):void {
    this.source.products.splice(productIndex, 1);
    this.products.splice(productIndex, 1);
  }

  private generateInvoice():void {

  }

}
