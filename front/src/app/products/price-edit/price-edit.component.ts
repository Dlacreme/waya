import { Component, Output, EventEmitter, Input } from '@angular/core';
import { InputOptions, InputType } from '../../form/input/input.component';
import { Product, PriceType } from '../../models/product';
import { ProductPriceDto } from '../../api/product.service';

export interface PricesEditResult {
  standard: ProductPriceDto|undefined,
  member: ProductPriceDto|undefined,
}

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.scss']
})
export class PriceEditComponent {

  public data:Product;
  public standardPrice:ProductPriceDto;
  public memberPrice:ProductPriceDto;

  public baseOptions:InputOptions = {} as InputOptions;
  public memberOptions:InputOptions = {} as InputOptions;

  @Output() onchange = new EventEmitter();

  @Input()
  set product(product:Product) {
    this.data = product;
    this.initInput();
  }

  constructor() { }

  public updateBase(value:number):void {
    this.standardPrice = {
      price: Number(value),
      product_price_type_id: PriceType.Default
    };
    this.submit();
  }

  public updateMember(value:number):void {
    this.memberPrice = {
      price: Number(value),
      product_price_type_id: PriceType.Member
    }
    this.submit();
  }

  public submit():void {
    this.onchange.emit({
      standard: this.standardPrice,
      member: this.memberPrice
    });
  }

  private initInput():void {
    this.baseOptions = {
      placeholder: 'Base Price',
      default: this.data.standardPrice ? this.data.standardPrice.price : -1,
      type: InputType.Number
    };
    this.memberOptions = {
      placeholder: 'Member Price',
      default: this.data.memberPrice ? this.data.memberPrice.price : -1,
      type: InputType.Number
    }
  }

}
