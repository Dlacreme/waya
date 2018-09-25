import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserDto } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {

  public search = '';

  public users = this.dataService.getUsers();
  public friends = this.dataService.getFriends();

  constructor(
    private dataService:DataService,
    private router:Router
  ) { }

  public ngOnInit():void {

  }

  public ngOnDestroy():void {

  }

  public matchSearch(user:UserDto):boolean {
    if (!this.search || this.search.length < 3) {
      return false;
    }
    return (
      user.username.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
      user.email.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
    );
  }

  public goTo(userId:number):void {
    this.router.navigate([`/my-yana/friend/${userId}`])
  }

}
