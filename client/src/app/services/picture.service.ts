import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PictureService extends Api {

  private readonly endpoints = {
    upload: 'upload'
  };

  constructor(
    protected httpClient:HttpClient
  ) {
    super(httpClient);
  }

  // https://nehalist.io/uploading-files-in-angular2/
  public readFile(file:File):Observable<string> {
    return new Observable<string>((subject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        subject.next((reader.result as string).split(',')[1]);
        subject.complete();
      };
    });
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
