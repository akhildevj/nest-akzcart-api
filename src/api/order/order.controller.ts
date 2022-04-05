import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
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
import {
  OrderBodyDto,
  OrderResponseDto,
  ParamsDto,
  SingleOrderResponseDto,
  UserIdDto,
} from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all orders' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  getOrders(
    @Param() params: UserIdDto,
  ): Observable<OrderResponseDto | Record<null, null>> {
    return this.orderService.getOrders(params);
  }

  @Get(':id/:orderId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get a single order' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'orderId' })
  @ApiResponse({ status: 200, type: SingleOrderResponseDto })
  getOrderById(
    @Param() params: ParamsDto,
  ): Observable<SingleOrderResponseDto | Record<null, null>> {
    return this.orderService.getOrderById(params);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a order' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: OrderBodyDto })
  @ApiResponse({ status: 200, type: MessageDto })
  createOrder(
    @Param() params: UserIdDto,
    @Body() body: OrderBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.orderService.createOrder(params, body);
  }
}