import { Injectable } from '@angular/core';
import { Api, ApiResult, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockDto } from './stock.service';

interface ProductCategoryDto {
  id:number;
  name:string;
  is_disabled:boolean;
  updated_at:Date;
  created_at:Date;
  parent_id:number;
  parent?:ProductCategoryDto;
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
  stocks:StockDto[];
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

  public list():Observable<ApiResult<ProductDto[]>> {
    return this.query<ProductDto[]>({
      endpoint: this.endpoints.product,
      method: HttpMethod.GET
    });
  }

}
