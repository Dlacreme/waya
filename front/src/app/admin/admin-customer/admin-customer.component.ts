import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserRole } from '../../models/user';
import { Subscription } from 'rxjs';
import { UserService, UserDto } from '../../api/user.service';
import { InputOptions } from '../../form/input/input.component';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.scss']
})
export class AdminCustomerComponent implements OnInit, OnDestroy {

  public users:UserDto[];
  public emailOptions:InputOptions;
  public nameOptions:InputOptions;
  public newUser:UserDto = {} as UserDto;

  private listSub = Subscription.EMPTY;
  private createSub = Subscription.EMPTY;

  constructor(
    private userService:UserService
  ) { }

  public ngOnInit():void {
    this.listSub = this.userService.searchRole(UserRole.Customer)
      .subscribe((users) => this.users = users.data || []);
    this.emailOptions = {
      placeholder: 'Email',
      default: ''
    };
    this.nameOptions = {
      placeholder: 'Name',
      default: ''
    }
  }

  public ngOnDestroy():void {
    this.listSub.unsubscribe();
    this.createSub.unsubscribe();
  }

  public updateEmail(email:string):void {
    this.newUser.email = email;
  }

  public updateName(name:string):void {
    this.newUser.username = name;
  }

  public createUser():void {
    if (this.newUser.email && this.newUser.username) {
      this.createSub = this.userService.create(this.newUser)
        .subscribe((res) => {
          if (res.data) {
            this.users.push(res.data);
          }
        });
    }
  }

}
