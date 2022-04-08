import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MessageDto } from 'src/models/message.dto';
import { UserIdDto } from 'src/models/user-id.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ORDER_ENUM, RATING_ENUM, SORT, SORT_ENUM } from 'src/shared/constants';
import {
  AllProductsResponseDto,
  ParamsDto,
  ProductBodyDto,
  ProductDetailsResponseDto,
  ProductIdDto,
  ProductQueryDto,
  productRatingBodyDto,
} from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'sortBy', required: false, enum: SORT_ENUM })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ORDER_ENUM })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'rating', required: false, enum: RATING_ENUM })
  @ApiQuery({ name: 'priceStart', required: false })
  @ApiQuery({ name: 'priceEnd', required: false })
  @ApiResponse({ status: 200, type: AllProductsResponseDto })
  getProducts(
    @Query() query: ProductQueryDto,
  ): Observable<AllProductsResponseDto[] | Record<null, null>> {
    return this.productService.getProducts(query);
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

  @Get('favourites/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Add product to favourites' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: MessageDto })
  getFavouriteProducts(
    @Param() params: UserIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.getFavouriteProducts(params);
  }

  @Post('favourites/:id/:productId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Add product to favourites' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 200, type: MessageDto })
  addToFavourites(
    @Param() params: ParamsDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.addToFavourites(params);
  }

  @Delete('favourites/:id/:productId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Remove product from favourites' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 200, type: MessageDto })
  removeFromFavourites(
    @Param() params: ParamsDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.removeFromFavourites(params);
  }
}
