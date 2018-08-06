import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

interface CachedResponse {
  expirationDate:Date|null;
  response:HttpResponse<any>;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private cache = new Map<string, CachedResponse>();

  public get(key:string):HttpResponse<any>|null {
    const cachedResponse:CachedResponse|undefined = this.cache.get(key);

    if (!cachedResponse) {
      return null;
    }

    if (cachedResponse.expirationDate && cachedResponse.expirationDate.getTime() < new Date().getTime()) {
      this.cache.delete(key);
      return null;
    }

    return cachedResponse.response;
  }

  public set(key:string, value:HttpResponse<any>, ttl:number|null = null):void {
    let expires:Date|null = null;
    if (ttl) {
      expires = new Date();
      expires.setSeconds(expires.getSeconds() + ttl);
    }
    this.cache.set(key, {
      expirationDate: expires,
      response: value
    });
  }
}
