import { BadRequestException, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/models/message.dto';
import { ADD_MESSAGE, GET_MESSAGE, INVALID_ID } from 'src/shared/constants';
import {
  createOrderQuery,
  getOrderByIdQuery,
  getOrdersQuery,
} from './db-queries/order.query';
import {
  OrderBodyDto,
  OrderDto,
  OrderResponseDto,
  ParamsDto,
  SingleOrderResponseDto,
  UserIdDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  getOrders(
    params: UserIdDto,
  ): Observable<OrderResponseDto | Record<null, null>> {
    const { id } = params;

    return this.databaseService
      .rawQuery(getOrdersQuery, [id], OrderDto)
      .pipe(map(orders => ({ success: true, message: GET_MESSAGE, orders })));
  }

  getOrderById(
    params: ParamsDto,
  ): Observable<SingleOrderResponseDto | Record<null, null>> {
    const { id, orderId } = params;

    return this.databaseService
      .rawQuery(getOrderByIdQuery, [id, orderId], OrderDto)
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: GET_MESSAGE, order: rows[0] };
        }),
      );
  }

  createOrder(
    params: UserIdDto,
    body: OrderBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = params;
    const { totalPrice, cart } = body;

    return this.databaseService
      .rawQuery(
        createOrderQuery,
        [id, totalPrice, JSON.stringify(cart)],
        OrderDto,
      )
      .pipe(map(() => ({ success: true, message: ADD_MESSAGE })));
  }
}
