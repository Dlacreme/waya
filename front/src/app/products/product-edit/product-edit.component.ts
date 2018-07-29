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
import { StockService, StockDto } from '../../api/stock.service';

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
  public basePriceOptions:InputOptions = {} as InputOptions;
  public memberPriceOptions:InputOptions = {} as InputOptions;
  public compoListOptions:SelectOptions = {} as SelectOptions;
  public compoQuantityOptions:InputOptions = {} as InputOptions;

  public categories:ProductCategoryDto[] = [];
  public stocksList:SelectItem[] = [];

  private paramSub:Subscription = Subscription.EMPTY;
  private productSub:Subscription = Subscription.EMPTY;
  private categorySub:Subscription = Subscription.EMPTY;
  private dialogSub:Subscription = Subscription.EMPTY;
  private updateSub:Subscription = Subscription.EMPTY;
  private deleteSub:Subscription = Subscription.EMPTY;
  private stockSub:Subscription = Subscription.EMPTY;

  private tmpPrice:Price = {} as Price;
  private tmpCompos:Compo[] = [];
  private tmpCompo:Compo = {} as Compo;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private productService:ProductService,
    public dialog:MatDialog,
    private matSnackBar:MatSnackBar,
    private stockService:StockService
  ) { }

  public ngOnInit():void {
    this.paramSub = this.route.params.subscribe((p) => this.loadProduct(p.id));
    this.stockSub = this.stockService.list()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((stock:StockDto) => {
            this.stocksList.push({
              value: stock.id,
              text: `${stock.name} - ${stock.stock_type.name} (${stock.stock_format.name} ${stock.size} ${stock.stock_format.stock_unit.name})`
            })
          })
        }
      });
  }

  public ngOnDestroy():void {
    this.paramSub.unsubscribe();
    this.productSub.unsubscribe();
    this.dialogSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.deleteSub.unsubscribe();
    this.categorySub.unsubscribe();
    this.stockSub.unsubscribe();
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

  public deleteCompo(compoItem:any):void {
    const compoIndex = this.tmpCompos.findIndex((item) => item.id === compoItem.id);
    if (compoIndex != -1) {
      this.tmpCompos.splice(compoIndex, 1);
    }
    console.log(this.tmpCompos);
  }

  public updateCompoStock(value:any):void {
    this.tmpCompo.stock = value;
  }

  public updateCompoQuantity(value:any):void {
    this.tmpCompo.quantity = value;
  }

  public addCompo():void {
    console.log('wtf');
    this.tmpCompos.push(this.tmpCompo);
  }

  public updateCompo():void {
    this.product.updateCompo(this.tmpCompos);
  }

  public updateBasePrice(value:any):void {
    this.tmpPrice.base = value;
  }

  public updateMemberPrice(value:any):void {
    this.tmpPrice.member = value;
  }

  public updatePrice():void {
    this.product.updatePrice(this.tmpPrice);
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
          this.tmpPrice = JSON.parse(JSON.stringify(this.product.price));
          this.tmpCompos = JSON.parse(JSON.stringify(this.product.compos));
        }
        console.log('PRODUCT > ', this.product);
        this.initNameOptions();
        this.initDescOptions();
        this.initCategoryOptions();
        this.initPricePicker();
        this.initCompoList();
        this.initCompoQuantity();
      });
  }

  private initNameOptions():void {
    this.nameOptions = {
      placeholder: 'Name',
      default: this.product.name
    }
  }

  private initDescOptions():void {
    this.descOptions = {
      placeholder: "Description",
      default: this.product.desc,
      type: InputType.Textarea
    };
  }

  private initCategoryOptions():void {
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

  private initCompoList():void {
    this.compoListOptions = {
      placeholder: 'Stock',
      default: '',
      items: this.stocksList
    };
  }

  private initCompoQuantity():void {
    this.compoQuantityOptions = {
      placeholder: 'Quantity',
      default: '',
      type: InputType.Number
    };
  }

  private initPricePicker():void {
    this.basePriceOptions = {
      placeholder: 'Base Price',
      default: this.product.price.base,
      type: InputType.Number
    };
    this.memberPriceOptions = {
      placeholder: 'Member Price',
      default: this.product.price.member,
      type: InputType.Number
    }
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
