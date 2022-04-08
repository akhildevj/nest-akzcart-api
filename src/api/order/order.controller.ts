import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MessageDto } from 'src/models/message.dto';
import { PaginationDto } from 'src/models/pagination.dto';
import { UserIdDto } from 'src/models/user-id.dto';
import {
  OrderResponseDto,
  ParamsDto,
  SingleOrderResponseDto,
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
    @Query() query: PaginationDto,
  ): Observable<OrderResponseDto | Record<null, null>> {
    return this.orderService.getOrders(params, query);
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
  @ApiResponse({ status: 200, type: MessageDto })
  createOrder(
    @Param() params: UserIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.orderService.createOrder(params);
  }
}
