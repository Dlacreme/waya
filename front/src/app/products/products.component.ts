import { Component, OnInit } from '@angular/core';
import { ProductService, ProductDto } from '../api/product.service';
import { Subscription } from 'rxjs';
import { InputOptions } from '../form/input/input.component';
import { SelectOptions, SelectItem } from '../form/select/select.component';
import { ApiItem } from '../api/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products:ProductDto[] = [];
  public showCreate = false;
  public productTmp:ProductDto = {} as ProductDto;

  public nameOptions:InputOptions = {} as InputOptions;
  public categoryOptions:SelectOptions = {} as SelectOptions;

  private productSub:Subscription = Subscription.EMPTY;
  private categorySub:Subscription = Subscription.EMPTY;

  constructor(
    private productService:ProductService
  ) { }

  public ngOnInit():void {
    this.productSub = this.productService.list()
      .subscribe((res) => this.products = res.data ? res.data : []);
    this.initCreateInputs();
  }

  public ngOnDestroy():void {
    this.productSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

  public openCreate(value:boolean):void {
    this.showCreate = value;
  }

  public updateName(name:string):void {
    this.productTmp.name = name;
  }

  public updateCategory(category:SelectItem):void {
    this.productTmp.product_category_id = category.value;
  }

  public createProduct():void {
    this.productService.create(this.productTmp)
      .subscribe(() => window.location.reload());
  }

  private initCreateInputs():void {
    this.nameOptions = {
      placeholder: 'Name',
      default: ''
    };
    this.categoryOptions = {
      placeholder: 'Category',
      items: []
    };
    this.categorySub = this.productService.getCategories()
    .subscribe((res) => {
      if (res.data) {
        this.insertItems(this.categoryOptions.items, res.data as ApiItem[]);
      }
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
