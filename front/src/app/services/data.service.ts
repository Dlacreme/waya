import { Injectable, OnDestroy } from '@angular/core';
import { UserDto, UserService } from '../api/user.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  public users:UserDto[] = []

  private readonly getUserSub = Subscription.EMPTY;

  constructor(
    private userService:UserService
  ) {
    this.getUserSub = this.userService.list()
      .subscribe((res) => {
        (res.data as UserDto[]).forEach((item) => this.users.push(item));
      });
  }

  public ngOnDestroy():void {
    this.getUserSub.unsubscribe();
  }

}
