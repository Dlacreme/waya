import { Injectable } from '@angular/core';
import { Api, ApiResult, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

export enum PriceType {
  Default = 1,
  Member = 2
}

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

export interface ProductStockDto {
  id?:number;
  quantity:number;
  updated_at?:Date;
  created_at?:Date;
  stock?:StockDto;
  stock_id?:number;
}

export interface ProductCategoryDto {
  id:number;
  name:string;
  is_disabled:boolean;
  updated_at:Date;
  created_at:Date;
  parent_id:number;
  parent?:ProductCategoryDto;
}

export interface ProductPriceDto {
  id?:number;
  start_date?:Date;
  end_date?:Date;
  created_at?:Date;
  updated_at?:Date;
  price:number;
  product_price_type_id:PriceType;
}

export interface ProductDto {
  id:number;
  name:string;
  desc:string;
  is_disabled:boolean;
  start_date:Date;
  end_date:Date;
  created_at:Date;
  updated_at:Date;
  product_category_id:number;
  product_category:ProductCategoryDto;
  product_stocks:ProductStockDto[];
  product_prices:ProductPriceDto[];
  standard_price:ProductPriceDto|undefined;
  member_price:ProductPriceDto|undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Api {

  public productSub = Subscription.EMPTY;

  private readonly endpoints = {
    product: 'product',
    category: 'product_category',
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  public get(productId:number):Observable<ApiResult<ProductDto>> {
    return this.query<ProductDto>({
      endpoint: `${this.endpoints.product}/${productId}`,
      method: HttpMethod.GET
    });
  }

  public list():Observable<ApiResult<ProductDto[]>> {
    return this.query<ProductDto[]>({
      endpoint: this.endpoints.product,
      method: HttpMethod.GET
    });
  }

  // Category
  public categoryList():Observable<ApiResult<ProductCategoryDto[]>> {
    return this.query<ProductCategoryDto[]>({
      endpoint: this.endpoints.category,
      method: HttpMethod.GET
    });
  }

}
