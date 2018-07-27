import { Injectable } from '@angular/core';
import { Api, ApiResult, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

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
