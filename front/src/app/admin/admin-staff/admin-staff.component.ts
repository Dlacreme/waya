import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRole } from '../../models/user';
import { Subscription } from 'rxjs';
import { UserService, UserDto } from '../../api/user.service';
import { SelectOptions, SelectItem } from '../../form/select/select.component';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.scss']
})
export class AdminStaffComponent implements OnInit, OnDestroy {

  public users:UserDto[];
  public customers:UserDto[];

  private pickedCustomer:UserDto|undefined;

  public userPromoteOptions:SelectOptions = {} as SelectOptions;

  public listSub = Subscription.EMPTY;
  public customerSub = Subscription.EMPTY;
  public updateRoleSub = Subscription.EMPTY;

  constructor(
    private userService:UserService
  ) { }

  public ngOnInit():void {
    this.listSub = this.userService.searchRole(UserRole.Staff)
      .subscribe((users) => this.users = users.data || []);
    this.listSub = this.userService.searchRole(UserRole.Customer)
      .subscribe((users) => {
        this.customers = users.data || [];
        this.userPromoteOptions = {
          placeholder: 'Search for a user',
          items: this.customers.map((item) => {
            return  {
              text: `${item.username} (${item.email})`,
              value: item.id
            };
          })
        };
      });
  }

  public ngOnDestroy():void {
    this.listSub.unsubscribe();
    this.updateRoleSub.unsubscribe();
  }

  public updatePickedCustomer(user:SelectItem):void {
    this.pickedCustomer = this.customers.find((item) => item.id === user.value);
  }

  public promotePickedUser():void {
    if (this.pickedCustomer) {
      const updateRoleSub = this.userService.updateRole(this.pickedCustomer, UserRole.Staff)
        .subscribe((res) => {
          if (res.data) {
            this.users.push(res.data);
          }
        });
    }
  }

  public demoteUser(user:UserDto):void {
    const updateRoleSub = this.userService.updateRole(user, UserRole.Customer)
      .subscribe((res) => {
        if (res.data) {
          this.users.forEach((item, index) => {
            if (item.id === (res.data as UserDto).id) {
              this.users.splice(index, 1);
              return;
            }
          })
        }
      });
  }

}
