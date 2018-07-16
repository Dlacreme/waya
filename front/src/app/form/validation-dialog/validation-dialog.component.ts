import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.scss']
})
export class ValidationDialogComponent {

  constructor(
    public dialogRef:MatDialogRef<ValidationDialogComponent>
  ) { }

  public onYes():void {
    this.dialogRef.close(true);
  }

  public onNo():void {
    this.dialogRef.close(false);
  }

}
