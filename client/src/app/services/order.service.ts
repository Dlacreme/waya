import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult, Api, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from './product.service';
import { FileDto } from '../services/file.service';

export enum PaymentMethod {
  CreditCard = 1,
  Cash = 2,
  Credit = 3
}

export enum OrderStatus {
  Pending = 1,
  Validated = 2,
  Cancelled = 3,
  Ready = 4,
  Delivered = 5,
  Paid = 6
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
  customer:any|null;
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

  invoice:FileDto;

  created_at:Date;
  updated_at:Date;
}

export interface Search {
  to: Date;
  from: Date;
  status:OrderStatus[]
}

@Injectable({
  providedIn: 'root'
})
export class OrderService extends Api {

  private readonly endpoints = {
    order: 'order',
    product: 'products',
    table: 'table',
    customer: 'customer',
    status: 'status',
    search: 'order/search',
    payment: 'payment'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient)
  }

  public create(comment:string = undefined):Observable<ApiResult<OrderDto>> {
    return comment ? this.query<OrderDto>({
      endpoint: this.endpoints.order,
      method: HttpMethod.POST,
      params: {
        comment: comment
      }
    }) : this.query<OrderDto>({
      endpoint: this.endpoints.order,
      method: HttpMethod.POST
    });
  }

  public payment(orderId:number, method:PaymentMethod):Observable<ApiResult<OrderDto>> {
    return this.query<OrderDto>({
      method: HttpMethod.POST,
      endpoint: `${this.endpoints.order}/${orderId}/${this.endpoints.payment}`,
      params: {
        payment_method_id: method
      }
    });
  }

  public updateTable(order:OrderDto, tableId:number, message:string|undefined = undefined):Observable<ApiResult<OrderDto>> {
    return this.query<OrderDto>({
      endpoint: `${this.endpoints.order}/${order.id}/${this.endpoints.table}`,
      method: HttpMethod.POST,
      params: message ? {table_id: tableId, message: message} : {table_id: tableId}
    });
  }

  public updateProducts(order:OrderDto, productIdsToAdd:number[], productIdsToRemove:number[]):Observable<ApiResult<OrderDto>> {
    return this.query<OrderDto>({
      endpoint: `${this.endpoints.order}/${order.id}/${this.endpoints.product}`,
      method: HttpMethod.POST,
      params: {
        product_to_add_ids: productIdsToAdd,
        product_to_remove_ids: productIdsToRemove
      }
    });
  }

  // Tables
  public tableList():Observable<ApiResult<TableDto[]>> {
    return this.query<TableDto[]>({
      endpoint: this.endpoints.table,
      method: HttpMethod.GET
    });
  }

}
