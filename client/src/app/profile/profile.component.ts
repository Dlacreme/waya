import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService, UserDto } from '../services/user.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public loading:boolean;
  public user:UserDto = {} as UserDto;
  public pictureUrl:string;

  public infoForm:FormGroup;

  public editing = false;

  private getSub = Subscription.EMPTY;
  private editSub = Subscription.EMPTY;
  private readSub = Subscription.EMPTY;
  private uploadSub = Subscription.EMPTY;

  @ViewChild('file') file;

  private readonly regexpAlpha = /[\u0600-\u06FFA-Za-z-_*]+/;
  private readonly regexpEmail =
// tslint:disable-next-line:max-line-length
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private userService:UserService,
    private pictureService:PictureService
  ) { }

  public ngOnInit():void {
    this.loadProfile();
  }

  public ngOnDestroy():void {
    this.getSub.unsubscribe();
    this.editSub.unsubscribe();
    this.uploadSub.unsubscribe();
    this.readSub.unsubscribe();
  }

  public edit(value:boolean):void {
    this.editing = value;
  }

  public submitEdit():void {
    if (this.infoForm.invalid) {
      return;
    }
    this.loading = true;
    this.user.email = this.infoForm.controls.email.value;
    this.user.username = this.infoForm.controls.username.value;
    this.editSub = this.userService.updateUser(this.user)
      .subscribe((res) => {
        this.user = res.data as UserDto;
        this.loading = false;
        this.pictureUrl = `${environment.wayaApi}${this.user.picture_url}`
        this.initForm();
        this.editing = false;
      })
  }

  public openUpload():void {
    this.file.nativeElement.click();
  }

  public onFileUploaded():void {
    this.process(this.file.nativeElement.files[0]);
  }

  private process(file:File):void {
    this.readSub = this.pictureService.readFile(file)
      .subscribe((res) => {
        this.uploadSub = this.pictureService.upload(
          'user',
          this.user.id.toString(),
          file
        ).subscribe((res) => {
          this.user = res.data as UserDto;
          this.loading = false;
          this.pictureUrl = `${environment.wayaApi}${this.user.picture_url}`
          this.initForm();
        });
      });
  }

  private loadProfile():void {
    this.loading = true;
    this.getSub = this.userService.getUser(0)
      .subscribe((res) => {
        this.user = res.data as UserDto;
        this.loading = false;
        this.pictureUrl = `${environment.wayaApi}${this.user.picture_url}`
        this.initForm();
      })
  }

  private initForm():void {
    this.infoForm = new FormGroup({
      username: new FormControl(
        this.user.username,
        [Validators.required, Validators.pattern(this.regexpAlpha)]
      ),
      email: new FormControl(
        this.user.email,
        [Validators.required, Validators.pattern(this.regexpEmail)],
      )
    })
  }

}
