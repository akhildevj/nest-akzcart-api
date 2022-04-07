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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MessageDto } from 'src/models/message.dto';
import { UserIdDto } from 'src/models/user-id.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import {
  AllProductsResponseDto,
  ProductBodyDto,
  ProductDetailsResponseDto,
  ProductIdDto,
  productRatingBodyDto,
} from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: AllProductsResponseDto })
  getProducts(): Observable<AllProductsResponseDto[] | Record<null, null>> {
    return this.productService.getProducts();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get single product by id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: ProductDetailsResponseDto })
  getProductDetails(
    @Param() params: ProductIdDto,
  ): Observable<ProductDetailsResponseDto | Record<null, null>> {
    return this.productService.getProductDetails(params);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Add new product' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ProductBodyDto })
  @ApiResponse({ status: 200, type: MessageDto })
  addProduct(
    @Param() params: UserIdDto,
    @Body() body: ProductBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.addProduct(params, body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ProductBodyDto })
  @ApiResponse({ status: 200, type: MessageDto })
  updateProduct(
    @Param() params: ProductIdDto,
    @Body() body: ProductBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.updateProduct(params, body);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: MessageDto })
  removeProduct(
    @Param() params: ProductIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.removeProduct(params);
  }

  @Patch('rating/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: productRatingBodyDto })
  @ApiResponse({ status: 200, type: MessageDto })
  updateProductRating(
    @Param() params: UserIdDto,
    @Body() body: productRatingBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.updateProductRating(params, body);
  }
}
