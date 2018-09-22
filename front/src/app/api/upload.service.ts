import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api, HttpMethod, ApiResult } from './api';
import { FileDto } from '../services/file.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends Api {

  private readonly endpoints = {
    upload: 'upload'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  public upload(endpoint:string, id:string, file:File):Observable<any> {
    const param = new FormData();
    param.append('file', file);

    return this.httpClient.post<any>(
      `${this.wayaApi}/${this.endpoints.upload}/${endpoint}/${id}`,
      param
    );
  }

}
