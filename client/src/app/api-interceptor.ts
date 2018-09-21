import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

enum RequestStatus {
  Pending,
  Success,
  Error,
}

enum HttpCode {
  InvalidQuery = 400,
  AccessDenied = 401,
  Error = 500
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private readonly TTL = 60 * 60 * 0.5; // 30 min

  constructor(
    private router:Router
  ) {}

  public intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    // Skipping the translation files
    if (request.url.match(/.*\.json/)) {
      return next.handle(request);
    }

    return this.doRequest(request, next);
  }

  private doRequest(request:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    let status:RequestStatus = RequestStatus.Pending;

    const token = localStorage.getItem(environment.tokenLocalStorage)

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            status = RequestStatus.Success;
          }
        }, error => {
          if (error.status === HttpCode.AccessDenied) {
            this.router.navigate(['/']);
          }
          status = RequestStatus.Error
        }
      ),
      finalize(() => {

      })
    );
  }

  private shouldUseCache(request:HttpRequest<any>):boolean {
    return false;
  }

}
