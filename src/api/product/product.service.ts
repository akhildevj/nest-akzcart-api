import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import {
  addProductQuery,
  deleteProductQuery,
  getAllProductsQuery,
  getProductDetailsQuery,
} from './db-queries/product-query';
import {
  AllProductsResponseDto,
  MessageDto,
  ProductBodyDto,
  ProductDetailsResponseDto,
  ProductDto,
  ProductIdDto,
} from './dto/product.dto';

const GET_MESSAGE = 'Succesfully fetched data';
const DELETE_MESSAGE = 'Succesfully deleted';
const ADD_MESSAGE = 'Succesfully added';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  getProducts(): Observable<AllProductsResponseDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(getAllProductsQuery, [], ProductDto)
      .pipe(
        map(products => ({ success: true, message: GET_MESSAGE, products })),
      );
  }

  getProductDetails(
    params: ProductIdDto,
  ): Observable<ProductDetailsResponseDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(getProductDetailsQuery, [params.id], ProductDto)
      .pipe(
        map(([product]) => ({ success: true, message: GET_MESSAGE, product })),
      );
  }

  addProduct(
    body: ProductBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { name, price, imageUrl, description } = body;

    return this.databaseService
      .rawQuery(
        addProductQuery,
        [name, price, imageUrl, description],
        ProductDto,
      )
      .pipe(map(() => ({ success: true, message: ADD_MESSAGE })));
  }

  removeProduct(
    params: ProductIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(deleteProductQuery, [params.id], ProductDto)
      .pipe(map(() => ({ success: true, message: DELETE_MESSAGE })));
  }
}
