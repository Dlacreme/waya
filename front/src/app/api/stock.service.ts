import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api, URI, HttpMethod, ApiResult } from './api';

export interface StockUnitDto {
  id:number;
  name:string;
  is_disabled:boolean;
}

export interface StockTypeDto {
  id:number;
  name:string;
  is_disabled:boolean;
}

export interface StockFormatDto {
  id:number;
  name:string;
  is_disabled:boolean;
  stock_unit:StockUnitDto;
  stock_unit_id:number;
}

export interface StockDto {
  id:number;
  name:string;
  desc:string;
  size:number;
  balance:number;
  is_disabled:boolean;
  created_at:Date;
  updated_at:Date;
  stock_type_id:number;
  stock_type:StockTypeDto;
  stock_format_id:number;
  stock_format:StockFormatDto;
}

@Injectable({
  providedIn: 'root'
})
export class StockService extends Api {

  private readonly endpoints = {
    stock: 'stock',
    format: 'stock_format',
    type: 'stock_type',
    unit: 'stock_unit'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  public get(id:number):Observable<ApiResult<StockDto>> {
    return this.query<StockDto>({
      endpoint: `${this.endpoints.stock}/${id}`,
      method: HttpMethod.GET
    });
  }

  public list():Observable<ApiResult<StockDto[]>> {
    return this.query<StockDto[]>({
      endpoint: this.endpoints.stock,
      method: HttpMethod.GET
    });
  }

  public update(stock:StockDto):Observable<ApiResult<StockDto>> {
    return this.query<StockDto>({
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

  public getFormats():Observable<ApiResult<StockFormatDto[]>> {
    return this.query<StockFormatDto[]>({
      endpoint: `${this.endpoints.format}`,
      method: HttpMethod.GET
    });
  }

  public getTypes():Observable<ApiResult<StockTypeDto[]>> {
    return this.query<StockFormatDto[]>({
      endpoint: `${this.endpoints.type}`,
      method: HttpMethod.GET
    });
  }

  public import(stockImport:StockDto[]):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.stock}`,
      method: HttpMethod.POST,
      params: stockImport
    });
  }

  // Types
  public typeList():Observable<ApiResult<StockTypeDto[]>> {
    return this.query<StockTypeDto[]>({
      endpoint: this.endpoints.type,
      method: HttpMethod.GET
    });
  }

  public typeCreate(type:StockTypeDto):Observable<ApiResult<StockTypeDto>> {
    return this.query<StockTypeDto>({
      endpoint: this.endpoints.type,
      method: HttpMethod.POST,
      params: type
    });
  }

  public typeUpdate(type:StockTypeDto):Observable<ApiResult<StockTypeDto>> {
    return this.query<StockTypeDto>({
      endpoint: `${this.endpoints.type}/${type.id}`,
      method: HttpMethod.PUT,
      params: type
    });
  }

  public typeDelete(typeId:number):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.type}/${typeId}`,
      method: HttpMethod.DELETE
    });
  }

  // Format
  public formatList():Observable<ApiResult<StockFormatDto[]>> {
    return this.query<StockFormatDto[]>({
      endpoint: this.endpoints.format,
      method: HttpMethod.GET
    });
  }

  public formatCreate(format:StockFormatDto):Observable<ApiResult<StockFormatDto>> {
    return this.query<StockFormatDto>({
      endpoint: this.endpoints.format,
      method: HttpMethod.POST,
      params: format
    });
  }

  public formatUpdate(format:StockFormatDto):Observable<ApiResult<StockFormatDto>> {
    return this.query<StockFormatDto>({
      endpoint: `${this.endpoints.format}/${format.id}`,
      method: HttpMethod.PUT,
      params: format
    });
  }

  public formatDelete(formatId:number):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.format}/${formatId}`,
      method: HttpMethod.DELETE
    });
  }

    // Unit
    public unitList():Observable<ApiResult<StockUnitDto[]>> {
      return this.query<StockUnitDto[]>({
        endpoint: this.endpoints.unit,
        method: HttpMethod.GET
      });
    }

    public unitCreate(unit:StockUnitDto):Observable<ApiResult<StockUnitDto>> {
      return this.query<StockUnitDto>({
        endpoint: this.endpoints.unit,
        method: HttpMethod.POST,
        params: unit
      });
    }

    public unitUpdate(unit:StockUnitDto):Observable<ApiResult<StockUnitDto>> {
      return this.query<StockUnitDto>({
        endpoint: `${this.endpoints.unit}/${unit.id}`,
        method: HttpMethod.PUT,
        params: unit
      });
    }

    public unitDelete(unitId:number):Observable<ApiResult<void>> {
      return this.query<void>({
        endpoint: `${this.endpoints.unit}/${unitId}`,
        method: HttpMethod.DELETE
      });
    }

}
