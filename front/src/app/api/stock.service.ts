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
  stock_type_id:number;
  stock_type:StockType;
  stock_format_id:number;
  stock_format:StockFormat;
}

@Injectable({
  providedIn: 'root'
})
export class StockService extends Api {

  private readonly endpoints = {
    stock: 'stock',
    format: 'stock_format',
    type: 'stock_type'
  };

  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public get():Observable<ApiResult<Stock[]>> {
    return this.query<Stock[]>({
      endpoint: this.endpoints.stock,
      method: HttpMethod.GET
    });
  }

  public update(stock:Stock):Observable<ApiResult<Stock>> {
    return this.query<Stock>({
      endpoint: `${this.endpoints.stock}/${stock.id}`,
      method: HttpMethod.PUT,
      params: stock
    });
  }

  public delete(stockId:number):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.stock}/${stockId}`,
      method: HttpMethod.DELETE
    });
  }

  public getFormats():Observable<ApiResult<StockFormat[]>> {
    return this.query<StockFormat[]>({
      endpoint: `${this.endpoints.format}`,
      method: HttpMethod.GET
    });
  }

  public getTypes():Observable<ApiResult<StockType[]>> {
    return this.query<StockFormat[]>({
      endpoint: `${this.endpoints.type}`,
      method: HttpMethod.GET
    });
  }

}
