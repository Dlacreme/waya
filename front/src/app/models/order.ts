import { OrderDto, OrderStatus } from "../api/order.service";
import { ProductDto } from "../api/product.service";
import { User, UserDto } from "./user";

export class Order {

  source:OrderDto;

  id:number;
  products:ProductDto[];
  customer:User|null;
  status:OrderStatus;
  price:number;

  created_at:Date;
  updated_at:Date;

  constructor(order:OrderDto) {
    console.log('ORDER > ', order);
    this.source = order;

    this.id = order.id;
    this.products = order.products;
    this.customer = order.customer_id ? new User(<UserDto>order.customer) : null;
    this.status = order.order_status_id;
    this.price = order.total_price || 0;

    this.created_at = order.created_at;
    this.updated_at = order.updated_at;
  }

  public setStatus(status:OrderStatus, comment:string|undefined = undefined):void {
    this.status = status;
    this.source.order_status_id = status;
  }

}
