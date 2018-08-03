import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../models/product';

@Component({
  selector: 'app-compo',
  templateUrl: './compo.component.html',
  styleUrls: ['./compo.component.scss']
})
export class CompoComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<CompoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Product
  ) { }

  ngOnInit() {

  }

  public close():void {
    this.dialogRef.close();
  }

}
