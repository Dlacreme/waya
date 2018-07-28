import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../api/product.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public product:Product;

  private paramSub:Subscription = Subscription.EMPTY;
  private productSub:Subscription = Subscription.EMPTY;
  private dialogSub:Subscription = Subscription.EMPTY;
  private updateSub:Subscription = Subscription.EMPTY;
  private deleteSub:Subscription = Subscription.EMPTY;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private productService:ProductService,
    public dialog:MatDialog,
    private matSnackBar:MatSnackBar
  ) { }

  public ngOnInit():void {
    this.paramSub = this.route.params.subscribe((p) => this.loadProduct(p.id));
  }

  public ngOnDestroy():void {
    this.paramSub.unsubscribe();
    this.productSub.unsubscribe();
    this.dialogSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.deleteSub.unsubscribe();
  }

  public openDeleteValidation():void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${this.product.name}?`
    });
    this.dialogSub = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub = this.productService.delete(this.product.id)
          .subscribe(() => {
            this.matSnackBar.open(`${this.product.name} deleted. Redirected...`, 'clock', {duration: 5000})
            this.router.navigate(['staff/products'])
          });
      }
    });
  }

  private loadProduct(productId:number):void {
    this.productSub = this.productService.get(productId)
      .subscribe((res) => {
        if (res.data) {
          this.product = new Product(res.data);
        }
      });
  }

}
