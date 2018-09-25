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

export enum FriendStatus {
  None = 0,
  Pending = 1,
  Validated = 2
}

export interface FriendDto {
  id:number;
  friend_profile:UserDto;
  friend_status_id:FriendStatus
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends Api {

  private readonly endpoints = {
    user: 'user',
    role: 'user/role',
    searchRole: 'user/search_by_role',
    friends: 'friends'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  public list():Observable<ApiResult<UserDto[]>> {
    return this.query<UserDto[]>({
      endpoint: this.endpoints.user,
      method: HttpMethod.GET
    });
  }

  public friends():Observable<ApiResult<FriendDto[]>> {
    return this.query<FriendDto[]>({
      endpoint: this.endpoints.friends,
      method: HttpMethod.GET
    });
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

  public addFriend(userId:number):Observable<ApiResult<any>> {
    return this.query<UserDto[]>({
      endpoint: this.endpoints.friends,
      method: HttpMethod.POST,
      params: {
        user_id: userId
      }
    });
  }

}
