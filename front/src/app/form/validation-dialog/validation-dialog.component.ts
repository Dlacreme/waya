import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.scss']
})
export class ValidationDialogComponent {

  constructor(
    public dialogRef:MatDialogRef<ValidationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string
  ) { }

  public onYes():void {
    this.dialogRef.close(true);
  }

  public onNo():void {
    this.dialogRef.close(false);
  }

}
