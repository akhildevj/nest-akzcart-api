import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageDto } from 'src/models/message.dto';
import {
  OrderBodyDto,
  OrderResponseDto,
  ParamsDto,
  SingleOrderResponseDto,
  UserIdDto,
} from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getOrders(
    @Param() params: UserIdDto,
  ): Observable<OrderResponseDto | Record<null, null>> {
    return this.orderService.getOrders(params);
  }

  @Get(':id/:orderId')
  @UsePipes(new ValidationPipe())
  getOrderById(
    @Param() params: ParamsDto,
  ): Observable<SingleOrderResponseDto | Record<null, null>> {
    return this.orderService.getOrderById(params);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe())
  createOrder(
    @Param() params: UserIdDto,
    @Body() body: OrderBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.orderService.createOrder(params, body);
  }
}
