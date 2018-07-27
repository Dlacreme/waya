import { Injectable } from '@angular/core';
import { Api, ApiResult, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './stock.service';

interface ProductCategory {
  id:number;
  name:string;
  is_disabled:boolean;
  updated_at:Date;
  created_at:Date;
  parent_id:number;
  parent?:ProductCategory;
}

export interface Product {
  id:number;
  name:string;
  desc:string;
  is_disabled:boolean;
  start_date:Date;
  end_date:Date;
  created_at:Date;
  updated_at:Date;
  product_category_id:number;
  product_category:ProductCategory;
  stocks:Stock[];
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

  public list():Observable<ApiResult<Product[]>> {
    return this.query<Product[]>({
      endpoint: this.endpoints.product,
      method: HttpMethod.GET
    });
  }

}
