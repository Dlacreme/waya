import { ProductService, ProductDto } from '../api/product.service';
import { Subscription } from 'rxjs';
import { UserDto } from '../models/user';
import { TableDto } from '../api/order.service';

export class StorageService {
  public static users:UserDto[] = [];
  public static products:ProductDto[] = [];
  public static tables:TableDto[] = [];
}
