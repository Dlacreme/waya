import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api, ApiResult, HttpMethod } from './api';
import { Observable } from 'rxjs';
import { TableDto } from './order.service';



@Injectable({
  providedIn: 'root'
})
export class AdminService extends Api {

  private readonly endpoints = {
    table: 'table'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  public listTable():Observable<ApiResult<TableDto>> {
    return this.query<TableDto>({
      endpoint: '',
      method: HttpMethod.GET
    });
  }

}
