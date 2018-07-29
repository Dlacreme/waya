import { Injectable } from '@angular/core';
import { Api, ApiResult, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockDto } from './stock.service';

export interface ProductStockDto {
  id:number;
  quantity:number;
  updated_at:Date;
  created_at:Date;
  stock:StockDto;
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
  member_price:number;
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
}

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Api {

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
    })
  }

  public list():Observable<ApiResult<ProductDto[]>> {
    return this.query<ProductDto[]>({
      endpoint: this.endpoints.product,
      method: HttpMethod.GET
    });
  }

  public delete(productId:number):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.product}/${productId}`,
      method: HttpMethod.DELETE
    });
  }

  public getCategories():Observable<ApiResult<ProductCategoryDto[]>> {
    return this.query<ProductCategoryDto[]>({
      endpoint: `${this.endpoints.category}`,
      method: HttpMethod.GET
    });
  }

  public update(product:ProductDto):Observable<ApiResult<ProductDto>> {
    return this.query<ProductDto>({
      endpoint: `${this.endpoints.product}/${product.id}`,
      method: HttpMethod.PUT,
      params: product
    });
  };

}
