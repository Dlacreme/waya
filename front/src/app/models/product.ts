import { ProductDto } from "../api/product.service";


export class Product {

  constructor(product:ProductDto) {
    console.log('Build With > ', product)
  }

}
