import { Injectable } from '@angular/core';
import { UserRole } from '../models/user';
import { Observable } from 'rxjs';
import { ApiResult, Api, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';

export interface UserDto {
  id:number;
  username:string;
  email:string;
  role_id:UserRole;
  created_at:Date;
  updated_at:Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends Api {

  private readonly endpoints = {
    user: 'user',
    role: 'user/role',
    searchRole: 'user/search_by_role'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  public get(userId:number):Observable<ApiResult<UserDto>> {
    return this.query<UserDto>({
      endpoint: `${this.endpoints.user}/${userId}`,
      method: HttpMethod.GET
    });
  }

  public list():Observable<ApiResult<UserDto[]>> {
    return this.query<UserDto[]>({
      endpoint: this.endpoints.user,
      method: HttpMethod.GET
    });
  }

  public searchRole(role:UserRole):Observable<ApiResult<UserDto[]>> {
    return this.query<UserDto[]>({
      endpoint: `${this.endpoints.searchRole}/${role}`,
      method: HttpMethod.GET
    });
  }

  public create(user:UserDto):Observable<ApiResult<UserDto>> {
    return this.query<UserDto>({
      endpoint: this.endpoints.user,
      method: HttpMethod.POST,
      params: user
    });
  }

  public update(user:UserDto):Observable<ApiResult<UserDto>> {
    return this.query<UserDto>({
      endpoint: `${this.endpoints.user}/${user.id}`,
      method: HttpMethod.PUT,
      params: user
    });
  };

  public updateRole(user:UserDto, role:UserRole):Observable<ApiResult<UserDto>> {
    return this.query<UserDto>({
      endpoint: `${this.endpoints.role}/${user.id}`,
      method: HttpMethod.PUT,
      params: {role_id: role}
    });
  };

}
