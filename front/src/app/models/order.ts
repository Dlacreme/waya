import { OrderDto, OrderStatus, TableDto } from "../api/order.service";
import { ProductDto } from "../api/product.service";
import { User, UserDto } from "./user";

export class Order {

  source:OrderDto;

  id:number;
  products:ProductDto[];
  customer:User|null;
  status:OrderStatus;
  price:number;
  table:TableDto|null;

  created_at:Date;
  updated_at:Date;

  constructor(order:OrderDto) {
    this.source = order;

    this.id = order.id;
    this.products = order.products;
    this.customer = order.customer_id ? new User(<UserDto>order.customer) : null;
    this.status = order.order_status_id;
    this.price = order.total_price || 0;
    this.table = order.table || null;

    this.created_at = order.created_at;
    this.updated_at = order.updated_at;
  }

  public setStatus(status:OrderStatus, comment:string|undefined = undefined):void {
    this.status = status;
    this.source.order_status_id = status;
  }

  public addProduct(product:ProductDto):void {
    this.source.products.push(product);
  }

  public removeProduct(productIndex:number):void {
    this.source.products.splice(productIndex, 1);
  }

}
