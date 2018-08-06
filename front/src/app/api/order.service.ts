import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult, Api, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { User, UserDto } from '../models/user';
import { ProductDto } from './product.service';

export enum OrderStatus {
  Pending = 1,
  Validated = 2,
  Cancelled = 3,
  Ready = 4,
  Delivered = 5,
  Paid = 6
}

export enum OrderActions {
  Create = 1,
  Update = 2,
  Comment = 3,
  Validate = 4,
  Cancel = 5,
  Ready = 6,
  Delivered = 7,
  Paid = 8
}

export interface TableDto {
  id:number;
  name:string;
}

export interface OrderStatusDto {
  id:number;
  name:string;
}

export interface OrderDto {
  id:number;
  customer_id:number|null;
  customer:UserDto|null;
  order_status_id:OrderStatus;
  order_status:OrderStatusDto;
  products:ProductDto[];
  table_id:number|null;
  table:TableDto|null;
  invoice_id:number|null;

  amount_paid:number|null;
  paid_at:Date;
  payment_method_it:number|null;
  total_price:number|null;

  created_at:Date;
  updated_at:Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService extends Api {

  private readonly endpoints = {
    order: 'order'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient)
  }

  public list():Observable<ApiResult<OrderDto[]>> {
    return this.query<OrderDto[]>({
      method: HttpMethod.GET,
      endpoint: this.endpoints.order
    });
  }

}
