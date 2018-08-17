import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.scss']
})
export class AdminCustomerComponent implements OnInit {

  public users:User[];

  private listSub = Subscription.EMPTY;

  constructor() { }

  ngOnInit() {
    // this.listSub = this.
  }

}
