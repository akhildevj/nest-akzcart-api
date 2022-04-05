import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CartService } from './cart.service';
import { UserIdDto, CartResponseDto, CartBodyDto } from './dto/cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get cart items' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  getCart(
    @Param() params: UserIdDto,
  ): Observable<CartResponseDto | Record<null, null>> {
    return this.cartService.getCart(params);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update cart items' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CartBodyDto })
  @ApiResponse({ status: 200, type: MessageDto })
  addToCart(
    @Param() params: UserIdDto,
    @Body() body: CartBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.cartService.addToCart(params, body);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Delete all cart items' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: MessageDto })
  clearCart(
    @Param() params: UserIdDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.cartService.clearCart(params);
  }
}
