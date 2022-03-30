import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  MessageDto,
  ProductBodyDto,
  ProductDto,
  ProductIdDto,
} from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  get(): ProductDto[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductDetails(@Param() params: ProductIdDto): ProductDto {
    return this.productService.getProductDetails(params);
  }

  @Post()
  addProduct(@Body() body: ProductBodyDto): MessageDto {
    return this.productService.addProduct(body);
  }

  @Delete(':id')
  removeProduct(@Param() params: ProductIdDto): MessageDto {
    return this.productService.removeProduct(params);
  }
}
