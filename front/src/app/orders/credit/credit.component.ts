import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../../api/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit, OnDestroy {

  public form:FormGroup;
  public users = this.dataService.users;
  public loading = false;

  private updateSub = Subscription.EMPTY;

  constructor(
    public dialogRef:MatDialogRef<CreditComponent>,
    private userService:UserService,
    private dataService:DataService
  ) { }

  public ngOnInit():void {
    this.form = new FormGroup({
      'user': new FormControl(
        '',
        [Validators.required]
      ),
      'amount': new FormControl(
        '',
      [Validators.required, Validators.pattern(/[0-9]*/), Validators.min(1)]
      )
    })
  }

  public ngOnDestroy():void {
    this.updateSub.unsubscribe();
  }

  public submit():void {
    if (this.form.invalid) {
      return;
    }
    const user = this.users.find((item) => item.id === this.form.controls.user.value);
    if (!user) {
      return;
    }
    this.loading = true;
    user.credit += parseInt(this.form.controls.amount.value, 10),
    console.log('user ', user);
    this.updateSub = this.userService.update(user)
      .subscribe((res) => {
        this.dialogRef.close();
      });
  }

}
