import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  create(@Body() product: ProductDto) {
    console.log(product);
    this.productService.create(product);
  }
  @Get()
  getAll(): ProductDto[] {
    return this.productService.findAll();
  }
}
