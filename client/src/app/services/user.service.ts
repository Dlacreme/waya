import { Injectable } from '@angular/core';
import { Api, ApiResult, HttpMethod } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum UserRole {
  Admin = 1,
  Staff = 2,
  Customer = 3
}

export interface UserDto {
  id:number;
  username:string;
  credit:number;
  email:string;
  role_id:UserRole;
  created_at:Date;
  updated_at:Date;
  picture_url:string;
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

  public getUser(userId:number):Observable<ApiResult<UserDto>> {
    return this.query<UserDto>({
      endpoint: `${this.endpoints.user}/${userId}`,
      method: HttpMethod.GET
    });
  }

  public updateUser(user:UserDto):Observable<ApiResult<UserDto>> {
    return this.query<UserDto>({
      endpoint: `${this.endpoints.user}/${user.id}`,
      method: HttpMethod.PUT,
      params: user
    });
  }

}
