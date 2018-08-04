import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult, Api, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';

export interface OrderDto {

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

  public list():Observable<ApiResult<OrderDto>> {
    return this.query<OrderDto>({
      method: HttpMethod.GET,
      endpoint: this.endpoints.order
    });
  }

}
