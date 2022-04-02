import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import {
  AllProductsResponseDto,
  MessageDto,
  ProductBodyDto,
  ProductDetailsResponseDto,
  ProductIdDto,
} from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Observable<AllProductsResponseDto[] | Record<null, null>> {
    return this.productService.getProducts();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getProductDetails(
    @Param() params: ProductIdDto,
  ): Observable<ProductDetailsResponseDto | Record<null, null>> {
    return this.productService.getProductDetails(params);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  addProduct(
    @Body() body: ProductBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.addProduct(body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateProduct(
    @Param() params: ProductIdDto,
    @Body() body: ProductBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.updateProduct(params, body);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  removeProduct(
    @Param() params: ProductIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.removeProduct(params);
  }
}
