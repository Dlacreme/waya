import { Component, OnInit, Input } from '@angular/core';
import { ProductDto } from '../../api/product.service';
import { Product } from '../../models/product';
import { MatDialog } from '@angular/material';
import { CompoComponent } from '../compo/compo.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public data:Product;
  public canEdit = false;
  public isEditable = false;
  public canSeeCompo = true;

  @Input()
  set product(product:ProductDto) {
    this.data = new Product(product);
  }

  @Input()
  set editable(canEdit:boolean) {
    this.canEdit = canEdit;
  }

  @Input()
  set showcompo(showCompo:boolean) {
    this.canSeeCompo = showCompo;
  }

  constructor(
    private dialog:MatDialog,
  ) { }

  ngOnInit() {
  }

  public showCompo():void {
    const dialog = this.dialog.open(CompoComponent, {
      data: this.data
    });
    const dialogSub = dialog.afterClosed().subscribe(() => dialogSub.unsubscribe());
  }

}
