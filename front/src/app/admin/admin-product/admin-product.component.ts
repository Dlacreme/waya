import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductCategoryDto, ProductService } from '../../api/product.service';
import { Subscription } from 'rxjs';
import { InputOptions } from '../../form/input/input.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';

interface EditableCategory {
  category:ProductCategoryDto;
  options:InputOptions;
}

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit, OnDestroy {

  public categories:EditableCategory[] = [];
  public isEditable:boolean = false;
  public newCategory:EditableCategory;
  public newOptions:InputOptions;

  private categorySub:Subscription = Subscription.EMPTY;
  private dialogSub:Subscription = Subscription.EMPTY;
  private updateSub:Subscription = Subscription.EMPTY;
  private createdSub:Subscription = Subscription.EMPTY;
  private deleteSub:Subscription = Subscription.EMPTY;

  constructor(
    private productService:ProductService,
    private matSnackBar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  public ngOnInit():void {
    this.categorySub = this.productService.categoryList()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((item) => {
            this.categories.push({
              category: JSON.parse(JSON.stringify(item)),
              options: {
                placeholder: 'Name',
                default: item.name,
              },
            })
          });
        }
      });
    this.initNewCategory();
  }

  public ngOnDestroy():void {
    this.categorySub.unsubscribe();
    this.updateSub.unsubscribe();
    this.dialogSub.unsubscribe();
    this.deleteSub.unsubscribe();
    this.createdSub.unsubscribe();
  }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }

  public updateCategoryName(category:EditableCategory, value:any):void {
    category.category.name = value;
  }

  public updateCategory(category:EditableCategory):void {
    this.updateSub = this.productService.categoryUpdate(category.category)
      .subscribe((res) => this.matSnackBar.open(`${category.category.name} saved`, 'close'));
  }

  public openDeleteValidation(category:EditableCategory):void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${category.category.name}?`
    });
    this.dialogSub = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub = this.productService.categoryDelete(category.category.id)
          .subscribe(() => {
            const catIndex = this.categories.findIndex((item) => item.category.id === category.category.id);
            if (catIndex !== -1) {
              this.categories.splice(catIndex, 1);
            }
            this.matSnackBar.open(`${category.category.name} deleted.`, 'close', {duration: 5000})
          });
      }
    });
  }

  public createCategory(category:EditableCategory):void {
    this.createdSub = this.productService.categoryCreate(category.category)
      .subscribe((res) => {
        this.newCategory.category.name = '';
        if (res.data) {
          this.categories.push({
            category: res.data,
            options: {
              placeholder: 'Name',
              default: res.data.name,
            }
          });
        }
        this.initNewCategory();
      });
  }

  private initNewCategory():void {
    const newCat = {
      name: ''
    } as ProductCategoryDto;
    this.newCategory = {
      category: newCat,
      options: {
        placeholder: 'Create new Category',
        default: newCat.name
      }
    };
  }

}
