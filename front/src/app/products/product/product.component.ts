import { Component, Input, OnDestroy } from '@angular/core';
import { ProductDto } from '../../api/product.service';
import { Product } from '../../models/product';
import { MatDialog } from '@angular/material';
import { CompoComponent } from '../compo/compo.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnDestroy {

  public data:Product;
  public canEdit = false;
  public isEditable = false;
  public canSeeCompo = true;

  private dialogSub:Subscription = Subscription.EMPTY;

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
    private router:Router
  ) { }

  public ngOnDestroy():void {
    this.dialogSub.unsubscribe();
  }

  public showCompo():void {
    const dialog = this.dialog.open(CompoComponent, {
      data: this.data
    });
    this.dialogSub = dialog.afterClosed().subscribe(() => this.dialogSub.unsubscribe());
  }

  public openDetails():void {
    this.router.navigate([`staff/product`, this.data.id])
  }

}
