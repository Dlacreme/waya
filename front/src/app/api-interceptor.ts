import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {EventService} from './services/event.service';
import {HttpCacheService} from './services/http-cache.service';

enum RequestStatus {
  Pending,
  Success,
  Error
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private readonly TTL = 60 * 60 * 0.5; // 30 min

  constructor(
    private eventService:EventService,
    private httpCacheService:HttpCacheService
  ) {}

  public intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    // Skipping the translation files
    if (request.url.match(/.*\.json/)) {
      return next.handle(request);
    }

    if (this.shouldUseCache(request)) {
      const fromCache:HttpResponse<any>|null = this.httpCacheService.get(request.url);
      if (fromCache) {
        setTimeout(() => this.eventService.loaderInProgress.emit(false)); // Timeout required.
        return of(fromCache);
      }
    }

    return this.doRequest(request, next);
  }

  private doRequest(request:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    let status:RequestStatus = RequestStatus.Pending;

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            status = RequestStatus.Success;
            if (this.shouldUseCache(request)) {
              this.httpCacheService.set(request.url, event, this.TTL);
            }
          }
        }, error => status = RequestStatus.Error
      ),
      finalize(() => {
        this.eventService.loaderInProgress.emit(false);
        if (status === RequestStatus.Error) {
          this.eventService.errorOccured.emit('ERROR.HTTP');
        }
      })
    );
  }

  private shouldUseCache(request:HttpRequest<any>):boolean {
    return request.method === 'GET';
  }

}
