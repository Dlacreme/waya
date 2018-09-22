import { ProductDto, ProductStockDto, ProductPriceDto } from "../api/product.service";
import { StockDto } from "../api/stock.service";
import { environment } from "../../environments/environment";

export enum PriceType {
  Default = 1,
  Member = 2
}

export interface Compo {
  id:number;
  quantity:number;
  stock:StockDto;
}

export class Product {

  id:number;
  name:string;
  desc:string;
  isDisabled:boolean;
  startDate:Date;
  endDate:Date;
  price:ProductPriceDto[];
  standardPrice:ProductPriceDto|undefined;
  memberPrice:ProductPriceDto|undefined;
  compos:Compo[];
  categoryId:number;
  category:string;
  pictureUrl:string;

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
    this.price = product.product_prices;
    this.standardPrice = product.standard_price;
    this.memberPrice = product.member_price;
    this.pictureUrl = `${environment.wayaApi}/${product.picture_url}`;
    this.compos = [];
    product.product_stocks.forEach((productStock:ProductStockDto) => {
      this.compos.push({
        id: productStock.id as number,
        quantity: productStock.quantity,
        stock: productStock.stock as StockDto,
      });
    });
  }

  public updatePrice(price:ProductPriceDto):void {
    if (price.product_price_type_id === PriceType.Default) {
      this.standardPrice = price;
      this.source.standard_price = price;
    } else {
      this.memberPrice = price;
      this.source.member_price = price;
    }
  }

  public updateCompo(compos:Compo[]):void {
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
