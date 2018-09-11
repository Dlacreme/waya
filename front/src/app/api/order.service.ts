import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult, Api, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { User, UserDto } from '../models/user';
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

  public create():Observable<ApiResult<OrderDto>> {
    return this.query<OrderDto>({
      endpoint: this.endpoints.order,
      method: HttpMethod.POST
    });
  }

  public list():Observable<ApiResult<OrderDto[]>> {
    return this.query<OrderDto[]>({
      method: HttpMethod.GET,
      endpoint: `${this.endpoints.order}?bustcache=${Date.now()}`
    });
  }

  public search(search:Search):Observable<ApiResult<OrderDto[]>> {
    return this.query<OrderDto[]>({
      method: HttpMethod.GET,
      endpoint: `${this.endpoints.search}/${search.from.toISOString().replace('.', '_')}/${search.to.toISOString().replace('.', '_')}/${search.status}?bustcache=${Date.now()}`
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

  public updateStatus(order:OrderDto, statusId:number, message:string|undefined = undefined):Observable<ApiResult<OrderDto>> {
    return this.query<OrderDto>({
      endpoint: `${this.endpoints.order}/${order.id}/${this.endpoints.status}`,
      method: HttpMethod.POST,
      params: message ? {status_id: statusId, message: message} : {status_id: statusId}
    });
  }

  public updateCustomer(order:OrderDto, userId:Number, message:string|undefined = undefined):Observable<ApiResult<OrderDto>> {
    return this.query<OrderDto>({
      endpoint: `${this.endpoints.order}/${order.id}/${this.endpoints.customer}`,
      method: HttpMethod.POST,
      params: message ? {user_id: userId, message: message} : {user_id: userId}
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

  public tableCreate(table:TableDto):Observable<ApiResult<TableDto>> {
    return this.query<TableDto>({
      endpoint: this.endpoints.table,
      method: HttpMethod.POST,
      params: table
    });
  }

  public tableUpdate(table:TableDto):Observable<ApiResult<TableDto>> {
    return this.query<TableDto>({
      endpoint: `${this.endpoints.table}/${table.id}`,
      method: HttpMethod.PUT,
      params: table
    });
  }

  public tableDelete(tableId:number):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.table}/${tableId}`,
      method: HttpMethod.DELETE
    });
  }

}
