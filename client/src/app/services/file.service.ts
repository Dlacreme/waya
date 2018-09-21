import { Injectable } from '@angular/core';

export interface FileDto {
  id:number;
  filename:string;
  content_type:string;
  file_content:string;
  created_at:Date;
  updated_at:Date
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

}
