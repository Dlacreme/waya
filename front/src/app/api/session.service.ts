import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Api, URI, HttpMethod, ApiResult } from './api';

export enum LoginProvider {
  Facebook = 1,
  Google = 2
}

export interface LoginSession {
  id:string;
  username:string;
  email:string;
  provider?:LoginProvider;
  token?:string;
}

@Injectable()
export class SessionService extends Api {

  private readonly endpoints = {
    login: 'login',
    signin: 'signin',
    loginProvider: 'login/:provider'
  };

  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public login(loginSession: LoginSession): Observable<ApiResult<LoginSession>> {
    if (loginSession.provider) {
      return this.loginProvider(loginSession);
    }
    return this.query<LoginSession>({
      endpoint: this.endpoints.login,
      params: loginSession,
      method: HttpMethod.POST,
    });
  }

  private loginProvider(loginSession: LoginSession): Observable<ApiResult<LoginSession>> {
    return this.query<LoginSession>({
      endpoint: this.endpoints.loginProvider,
      params: loginSession,
      method: HttpMethod.POST,
      endpointParams: {
        provider: LoginProvider[<LoginProvider>loginSession.provider]
      }
    });
  }

}
