import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public overwriteObject(object:any, data:any):void {
    for (var prop in data) {
      if (data[prop]) {
        object[prop] = data[prop];
      }
    }
  }
}
