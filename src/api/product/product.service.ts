import { BadRequestException, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/models/message.dto';
import { UserIdDto } from 'src/models/user-id.dto';
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGE,
  INVALID_ID,
  ORDER,
  SORT,
  UPDATE_MESSAGE,
} from 'src/shared/constants';
import {
  addProductQuery,
  addToFavouritesQuery,
  deleteProductQuery,
  getFavouriteProductsQuery,
  getProductDetailsQuery,
  productSelectQuery,
  removeFromFavouritesQuery,
  updateProductQuery,
  updateproductRatingQuery,
} from './db-queries/product.query';
import {
  AllProductsResponseDto,
  ParamsDto,
  ProductBodyDto,
  ProductDetailsResponseDto,
  ProductDto,
  ProductIdDto,
  ProductQueryDto,
  productRatingBodyDto,
} from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  getProducts(
    query: ProductQueryDto,
  ): Observable<AllProductsResponseDto | Record<null, null>> {
    const {
      limit,
      offset,
      sortBy,
      sortOrder,
      search,
      rating,
      priceStart,
      priceEnd,
    } = query;

    const queryList = [productSelectQuery];
    const whereList = [];

    if (search) whereList.push(`name LIKE '%${search}%'`);
    if (rating) whereList.push(`rating >=${rating}`);
    if (priceStart) whereList.push(`price >=${priceStart}`);
    if (priceEnd) whereList.push(`price <=${priceEnd}`);

    if (whereList.length) queryList.push(`WHERE ${whereList.join(' AND ')}`);

    if (sortBy && sortOrder) {
      let sort: string;
      switch (sortBy) {
        case SORT.RATING: {
          sort = SORT.RATING_TEXT;
          break;
        }
        case SORT.PRICE: {
          sort = SORT.PRICE_TEXT;
          break;
        }
        default: {
          sort = SORT.TIME_TEXT;
          break;
        }
      }
      queryList.push(
        `ORDER BY ${sort} ${
          sortOrder === ORDER.DESCENDING
            ? ORDER.DESCENDING_TEXT
            : ORDER.ASCENDING_TEXT
        }`,
      );
    }
    queryList.push(`LIMIT ${limit} OFFSET ${offset}`);

    return this.databaseService
      .rawQuery(queryList.join(' '), [], ProductDto)
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
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: GET_MESSAGE, product: rows[0] };
        }),
      );
  }

  addProduct(
    params: UserIdDto,
    body: ProductBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = params;
    const { name, price, imageUrl, description } = body;

    return this.databaseService
      .rawQuery(
        addProductQuery,
        [name, price, imageUrl, description, id],
        ProductDto,
      )
      .pipe(map(() => ({ success: true, message: ADD_MESSAGE })));
  }

  updateProduct(
    params: ProductIdDto,
    body: ProductBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = params;
    const { name, price, imageUrl, description } = body;

    return this.databaseService
      .rawQuery(
        updateProductQuery,
        [id, name, price, imageUrl, description],
        ProductDto,
      )
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: UPDATE_MESSAGE };
        }),
      );
  }

  removeProduct(
    params: ProductIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(deleteProductQuery, [params.id], ProductDto)
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: DELETE_MESSAGE };
        }),
      );
  }

  updateProductRating(
    params: ProductIdDto,
    body: productRatingBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = params;
    const { productId, rating } = body;

    return this.databaseService
      .rawQuery(updateproductRatingQuery, [id, productId, rating], ProductDto)
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: UPDATE_MESSAGE };
        }),
      );
  }

  getFavouriteProducts(
    params: UserIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = params;

    return this.databaseService
      .rawQuery(getFavouriteProductsQuery, [id], ProductDto)
      .pipe(
        map(products => ({ success: true, message: ADD_MESSAGE, products })),
      );
  }

  addToFavourites(
    params: ParamsDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id, productId } = params;

    return this.databaseService
      .rawQuery(addToFavouritesQuery, [id, productId], ProductDto)
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: ADD_MESSAGE };
        }),
      );
  }

  removeFromFavourites(
    params: ParamsDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id, productId } = params;

    return this.databaseService
      .rawQuery(removeFromFavouritesQuery, [id, productId], ProductDto)
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: DELETE_MESSAGE };
        }),
      );
  }
}
