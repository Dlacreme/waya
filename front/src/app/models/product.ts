import { ProductDto, ProductStockDto, ProductPriceDto } from "../api/product.service";
import { StockDto } from "../api/stock.service";

export interface Compo {
  id:number;
  quantity:number;
  stock:StockDto;
}

export interface Price {
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
  price:Price;
  compos:Compo[];
  valid:boolean;
  categoryId:number;
  category:string;

  source:ProductDto;

  constructor(product:ProductDto) {
    this.source = product;

    this.id = product.id;
    this.name = product.name;
    this.desc = product.desc;
    this.isDisabled = product.is_disabled;
    this.startDate = product.start_date;
    this.endDate = product.end_date;
    this.categoryId = product.product_category.id;
    this.category = product.product_category.name;
    this.price = product.product_prices.length > 0
    ? {
      base: product.product_prices[0].price,
      member: product.product_prices[0].member_price
    } : {
      base: -1,
      member: -1
    };
    this.compos = [];
    product.product_stocks.forEach((productStock:ProductStockDto) => {
      this.compos.push({
        id: productStock.id as number,
        quantity: productStock.quantity,
        stock: productStock.stock as StockDto,
      });
    });

    this.valid = this.isValid();
  }

  public isValid():boolean {
    return (
      (!this.isDisabled)
      && this.price.base !== -1
      && this.price.member !== -1
    );
  }

  public updatePrice(price:Price):void {
    this.price = price;
    this.source.product_prices = [{
      member_price: this.price.member,
      price: this.price.base
    }];
  }

  public updateCompo(compos:Compo[]):void {
    console.log(compos);

    this.compos = compos;
    const sourceCompo:ProductStockDto[] = [];

    compos.forEach((compo) => {
      sourceCompo.push({
        id: compo.id || undefined,
        quantity: compo.quantity,
        stock_id: compo.stock.id
      });
    });
    this.source.product_stocks = sourceCompo;
  }

}
