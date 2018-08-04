import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE
}

export interface URI {
  endpoint: string;
  method: HttpMethod;
  endpointParams?: any;
  params?: any;
}

export interface ApiResult<T> {
  code: number;
  message: string;
  errors?: any;
  data?: T;
}

export interface ApiItem {
  id:number;
  name:string;
}

export class Api {

  protected readonly wayaApi = environment.wayaApi;

  constructor(
    protected httpClient: HttpClient
  ) { }

  public setToken(token:string):void {
    console.log('Set token > ', token);
  }

  protected query<T>(uri: URI): Observable<ApiResult<T>> {
    switch (uri.method) {
      case HttpMethod.POST:
        return this.httpClient.post<ApiResult<T>>(this.buildUrl(uri), uri.params);
      case HttpMethod.PUT:
        return this.httpClient.put<ApiResult<T>>(this.buildUrl(uri), uri.params);
      case HttpMethod.DELETE:
        return this.httpClient.delete<ApiResult<T>>(this.buildUrl(uri));
    }
    return this.httpClient.get<ApiResult<T>>(this.buildUrl(uri));
  }

  protected buildUrl(uri: URI): string {
    return uri.params && (uri.method === HttpMethod.GET || uri.method === HttpMethod.DELETE)
      ? `${this.wayaApi}/${this.formatEndPoint(uri.endpoint, uri.endpointParams)}?${this.formatGetParams(uri.params)}`
      : `${this.wayaApi}/${this.formatEndPoint(uri.endpoint, uri.endpointParams)}`;
  }

  protected formatEndPoint(endpoint: string, endpointParams: any): string {
    if (! endpointParams || endpointParams === {}) {
      return endpoint;
    }
    let finalEndpoint = '' + endpoint;
    for (const paramKey in endpointParams) {
      if (endpointParams[paramKey]) {
        finalEndpoint = finalEndpoint.replace(`:${paramKey}`, endpointParams[paramKey]);
      }
    }
    return finalEndpoint;
  }

  protected formatGetParams(data: any[]): string {
    let paramStr = '';
    for (const key in data) {
      if (data[key] !== undefined) {
        paramStr += `&${key}=${data[key]}`;
      }
    }
    return paramStr.substr(1);
  }

}
