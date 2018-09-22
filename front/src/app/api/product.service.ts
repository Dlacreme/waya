import { Injectable } from '@angular/core';
import { Api, ApiResult, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { StockDto } from './stock.service';
import { PriceType } from '../models/product';

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
  picture_url:string;
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

  public create(product:ProductDto):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: this.endpoints.product,
      method: HttpMethod.POST,
      params: product
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

  // Category
  public categoryList():Observable<ApiResult<ProductCategoryDto[]>> {
    return this.query<ProductCategoryDto[]>({
      endpoint: this.endpoints.category,
      method: HttpMethod.GET
    });
  }

  public categoryCreate(category:ProductCategoryDto):Observable<ApiResult<ProductCategoryDto>> {
    return this.query<ProductCategoryDto>({
      endpoint: this.endpoints.category,
      method: HttpMethod.POST,
      params: category
    });
  }

  public categoryUpdate(category:ProductCategoryDto):Observable<ApiResult<ProductCategoryDto>> {
    return this.query<ProductCategoryDto>({
      endpoint: `${this.endpoints.category}/${category.id}`,
      method: HttpMethod.PUT,
      params: category
    });
  }

  public categoryDelete(categoryId:number):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.category}/${categoryId}`,
      method: HttpMethod.DELETE
    });
  }

}
