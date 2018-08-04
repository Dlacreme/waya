import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  loaderInProgress = new EventEmitter<boolean>();
  errorOccured = new EventEmitter<string>();
}
