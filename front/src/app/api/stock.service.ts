import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api, URI, HttpMethod, ApiResult } from './api';

export interface StockUnit {
  id:number;
  name:string;
  is_disabled:boolean;
}

export interface StockType {
  id:number;
  name:string;
  is_disabled:false;
}

export interface StockFormat {
  id:number;
  name:string;
  is_disabled:false;
  stock_unit:StockUnit;
}

export interface Stock {
  id:number;
  name:string;
  desc:string;
  size:number;
  balance:number;
  is_disabled:boolean;
  created_at:Date;
  updated_at:Date;
  stock_type:StockType;
  stock_format:StockFormat;
}

@Injectable({
  providedIn: 'root'
})
export class StockService extends Api {

  private readonly endpoints = {
    stock: 'stock'
  };

  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public get(): Observable<ApiResult<Stock[]>> {
    return this.query<Stock[]>({
      endpoint: this.endpoints.stock,
      method: HttpMethod.GET
    });
  }

}
