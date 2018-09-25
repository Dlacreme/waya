import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FileDto {
  id?:number;
  filename:string;
  content_type:string;
  file_content:string;
  created_at?:Date;
  updated_at?:Date
}

export enum FileType {
  PDF = 'application/pdf',
  PNG = 'image/png',
  JPG = 'image/jpg',
  JPEG = 'image/jpeg'
}

export enum FileStatus {
  Success,
  AlreadyUploaded,
  InvalidExtension,
  MissingInformation,
  InvalidInsurance,
  Invalid // 400 from server
}


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  public download(file:FileDto):void {
    var blob = new Blob([file.file_content], { type: file.content_type });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
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

}
