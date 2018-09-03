import { ProductService, ProductDto } from '../api/product.service';
import { Subscription } from 'rxjs';

export class StorageService {
  public static products:ProductDto[] = [];
}
