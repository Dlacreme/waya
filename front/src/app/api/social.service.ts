import { Injectable } from '@angular/core';
import { Api, HttpMethod, ApiResult } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleDto {
  id:number;
  name:string;
  desc:string;
  content:string;
  created_at:Date;
  updated_at:Date;
}

@Injectable({
  providedIn: 'root'
})
export class SocialService extends Api {

  private readonly endpoints = {
    article: 'article'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  public createArticle(article:ArticleDto):Observable<ApiResult<ArticleDto>> {
    return this.query<ArticleDto>({
      endpoint: this.endpoints.article,
      method: HttpMethod.POST,
      params: article
    });
  }

  public getArticle(id:number):Observable<ApiResult<ArticleDto>> {
    return this.query<ArticleDto>({
      method: HttpMethod.GET,
      endpoint: `${this.endpoints.article}/${id}`,
    });
  }

  public listArticle():Observable<ApiResult<ArticleDto[]>> {
    return this.query<ArticleDto[]>({
      method: HttpMethod.GET,
      endpoint: `${this.endpoints.article}?bustcache=${Date.now()}`
    });
  }

  public updateArticle(article:ArticleDto):Observable<ApiResult<ArticleDto>> {
    return this.query<ArticleDto>({
      endpoint: `${this.endpoints.article}/${article.id}`,
      method: HttpMethod.PUT,
      params: article
    });
  }

  public deleteArticle(id:number):Observable<ApiResult<void>> {
    return this.query<void>({
      endpoint: `${this.endpoints.article}/${id}`,
      method: HttpMethod.DELETE,
    });
  }

}
