import { ProductDto } from "../services/product.service";

interface Price {
  normal:number;
  member:number;
}

export class Product {

  public id:number;
  public name:string;
  public category:string;
  public price:Price;
  public disabled:boolean;

  private source:ProductDto;

  constructor(product:ProductDto) {
    this.source = product;
    this.refreshFromSource();
  }

  private refreshFromSource():void {
    this.id = this.source.id;
    this.name = this.source.name;
    this.category = this.source.product_category.name
    this.price = {
      normal: this.source.standard_price ? this.source.standard_price.price : this.source.member_price.price,
      member: this.source.member_price ? this.source.member_price.price : this.source.standard_price.price
    };
    this.disabled = this.isDisabled();
  }

  private isDisabled():boolean {
    if (!this.price.normal && !this.price.member) {
      return true;
    }


    return false;
  }

}
