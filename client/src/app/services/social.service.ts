import { Injectable } from '@angular/core';
import { Api, HttpMethod, ApiResult } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventDto {
  id?:number;
  slots:number;
  event_time:Date;
  article:ArticleDto;
}

export interface ArticleDto {
  id?:number;
  name:string;
  desc:string;
  content:string;
  is_disabled?:boolean;
  is_published:boolean;
  created_at?:Date;
  updated_at?:Date;
  picture_url:string;
}

@Injectable({
  providedIn: 'root'
})
export class SocialService extends Api {

  private readonly endpoints = {
    article: 'article',
    event: 'event'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
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

  public getEvent(id:number):Observable<ApiResult<EventDto>> {
    return this.query<EventDto>({
      method: HttpMethod.GET,
      endpoint: `${this.endpoints.event}/${id}`,
    });
  }

  public listEvent():Observable<ApiResult<EventDto[]>> {
    return this.query<EventDto[]>({
      method: HttpMethod.GET,
      endpoint: `${this.endpoints.event}?bustcache=${Date.now()}`
    });
  }

}
