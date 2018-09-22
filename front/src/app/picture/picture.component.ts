import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FileService, FileDto } from '../services/file.service';
import { Subscription } from 'rxjs';
import { UploadService } from '../api/upload.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit, OnDestroy {

  public iconName = 'camera';
  public acceptTypes = '*';

  private productId:number;
  private uploadEndpoint:string;

  private readSub = Subscription.EMPTY;
  private uploadSub = Subscription.EMPTY;

  @ViewChild('file') file;

  @Input()
  set icon(iconName:string) {
    this.iconName = iconName;
  }

  @Input()
  set accept(accept:string) {
    this.acceptTypes = accept;
  }

  @Input()
  set id(id:number) {
    this.productId = id;
  }

  @Input()
  set endpoint(endpoint:string) {
    this.uploadEndpoint = endpoint;
  }

  @Output() onupload = new EventEmitter();

  constructor(
    private fileService:FileService,
    private uploadService:UploadService
  ) { }

  public ngOnInit():void {

  }

  public ngOnDestroy():void {
    this.readSub.unsubscribe();
    this.uploadSub.unsubscribe();
  }

  public openUpload():void {
    this.file.nativeElement.click();
  }

  public onFileUploaded():void {
    this.process(this.file.nativeElement.files[0]);
  }

  private process(file:File):void {
    this.readSub = this.fileService.readFile(file)
      .subscribe((res) => {
        this.uploadSub = this.uploadService.upload(
          this.uploadEndpoint,
          this.productId.toString(),
          file
        ).subscribe((res) => this.onupload.emit(res));
      });
  }

}
