import { BadRequestException, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/models/message.dto';
import { UserIdDto } from 'src/models/user-id.dto';
import {
  DELETE_MESSAGE,
  GET_MESSAGE,
  INVALID_ID,
  UPDATE_MESSAGE,
} from 'src/shared/constants';
import {
  addToCartQuery,
  clearCartQuery,
  getCartQuery,
} from './db-queries/cart.query';
import { CartDto, CartResponseDto, CartBodyDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  getCart(params: UserIdDto): Observable<CartResponseDto | Record<null, null>> {
    const { id } = params;

    return this.databaseService
      .rawQuery(getCartQuery, [id], CartDto)
      .pipe(map(cart => ({ success: true, message: GET_MESSAGE, cart })));
  }

  addToCart(
    params: UserIdDto,
    body: CartBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = params;
    const { productId, quantity } = body;

    return this.databaseService
      .rawQuery(addToCartQuery, [productId, quantity, id], CartDto)
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: UPDATE_MESSAGE };
        }),
      );
  }

  clearCart(params: UserIdDto): Observable<MessageDto | Record<null, null>> {
    const { id } = params;

    return this.databaseService.rawQuery(clearCartQuery, [id], CartDto).pipe(
      map(rows => {
        if (!rows.length) throw new BadRequestException(INVALID_ID);
        return { success: true, message: DELETE_MESSAGE };
      }),
    );
  }
}
