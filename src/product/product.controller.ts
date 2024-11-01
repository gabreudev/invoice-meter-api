import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
  @Get(':/id')
  findByid(@Param('id') id: string): ProductDto {
    return this.productService.findByid(id);
  }
  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    this.productService.update(id, product);
  }
}
