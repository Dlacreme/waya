import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Price, Compo } from '../../models/product';
import { ProductService, ProductCategoryDto } from '../../api/product.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';
import { InputOptions, InputType } from '../../form/input/input.component';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { ApiItem } from '../../api/api';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  public product:Product;

  public nameOptions:InputOptions = {} as InputOptions;
  public descOptions:InputOptions = {} as InputOptions;
  public categoryOptions:SelectOptions = {} as SelectOptions;

  public categories:ProductCategoryDto[] = [];
  public stocksList:SelectItem[] = [];

  private paramSub:Subscription = Subscription.EMPTY;
  private productSub:Subscription = Subscription.EMPTY;
  private categorySub:Subscription = Subscription.EMPTY;
  private dialogSub:Subscription = Subscription.EMPTY;
  private updateSub:Subscription = Subscription.EMPTY;
  private deleteSub:Subscription = Subscription.EMPTY;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private productService:ProductService,
    public dialog:MatDialog,
    private matSnackBar:MatSnackBar,
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
    this.categorySub.unsubscribe();
  }

  public openDeleteValidation():void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${this.product.name}?`
    });
    this.dialogSub = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub = this.productService.delete(this.product.id)
          .subscribe(() => {
            this.matSnackBar.open(`${this.product.name} deleted. Redirected...`, 'close', {duration: 5000})
            this.router.navigate(['staff/products']);
          });
      }
    });
  }

  public updateName(name:string):void {
    this.product.source.name = name;
  }

  public updateDesc(desc:string):void {
    this.product.source.desc = desc;
  }

  public updateCategory(category:any):void {
    this.product.source.product_category_id = category.value;
  }

  public updateCompo(compo:Compo[]):void {
    this.product.updateCompo(compo);
  }

  public updatePrice(price:Price):void {
    this.product.updatePrice(price);
  }

  public update():void {
    this.updateSub = this.productService.update(this.product.source)
      .subscribe((res) => {
        this.matSnackBar.open(`${this.product.name} updated. Redirected...`, 'close', {duration: 5000})
        this.router.navigate(['staff/products']);
      });
  }

  private loadProduct(productId:number):void {
    this.productSub = this.productService.get(productId)
      .subscribe((res) => {
        if (res.data) {
          this.product = new Product(res.data);
        }
        console.log('PRODUCT > ', this.product);
        this.initInputs();
      });
  }

  private initInputs():void {
    this.nameOptions = {
      placeholder: 'Name',
      default: this.product.name
    };
    this.descOptions = {
      placeholder: "Description",
      default: this.product.desc,
      type: InputType.Textarea
    };
    this.categoryOptions = {
      placeholder: 'Category',
      default: this.product.categoryId,
      items: []
    };

    this.categorySub = this.productService.getCategories()
    .subscribe((res) => {
      if (res.data) {
        this.categories = res.data;
      }
      this.insertItems(this.categoryOptions.items, res.data as ApiItem[]);
    });
  }

  private insertItems(array:SelectItem[], apiData:ApiItem[]):void {
    if (!apiData) {
      return;
    }
    apiData.forEach((item) => {
      array.push({
        value: item.id,
        text: item.name
      });
    });
  }

}
