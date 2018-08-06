import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductCategoryDto, ProductService } from '../../api/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit, OnDestroy {

  public categories:ProductCategoryDto[] = [];

  private categorySub:Subscription = Subscription.EMPTY;

  constructor(
    private productService:ProductService,
  ) { }

  public ngOnInit():void {
    this.categorySub = this.productService.categoryList()
      .subscribe((res) => this.categories = res.data || []);
  }

  public ngOnDestroy():void {
    this.categorySub.unsubscribe();
  }

}
