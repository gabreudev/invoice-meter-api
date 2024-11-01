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
  findByid(id: string): ProductDto {
    const found = this.products.filter((product) => product.id === id);
    return found[0];
  }
  update(id: string, product: ProductDto) {
    const indexProduct = this.products.findIndex(
      (product) => product.id === id,
    );
    if (indexProduct) {
      this.products[indexProduct] = product;
    }
  }
}
