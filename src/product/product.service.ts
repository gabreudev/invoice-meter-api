import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  private products: ProductDto[] = [];
  create(product: ProductDto) {
    this.products.push(product);
  }
  findAll(): ProductDto[] {
    return this.products;
  }
}
