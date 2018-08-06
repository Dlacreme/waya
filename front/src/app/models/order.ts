import { OrderDto } from "../api/order.service";


export class Order {

  source:OrderDto;

  constructor(order:OrderDto) {
    this.source = order;
  }

}
