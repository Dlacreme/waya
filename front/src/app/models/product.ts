import { ProductDto } from "../api/product.service";

class Compo {

}

class Price {
  base:number;
  member:number;
}

export class Product {

  id:number;
  name:string;
  desc:string;
  isDisabled:boolean;
  startDate:Date;
  endDate:Date;
  createdAt:Date;
  updatedAt:Date;
  price:Price;
  compos:Compo[];

  constructor(product:ProductDto) {
    console.log('Build With > ', product)
  }

}
