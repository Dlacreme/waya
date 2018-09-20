import { ProductDto } from "../services/product.service";

export class Product {

  private source:ProductDto;

  constructor(product:ProductDto) {
    this.source = product;
    this.refreshFromSource();
  }

  private refreshFromSource():void {
    console.log('Product > ', this.source);
  }

}
