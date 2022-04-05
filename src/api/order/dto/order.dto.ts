import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CartDto } from 'src/api/cart/dto/cart.dto';
import { MessageDto } from 'src/models/message.dto';

export class OrderDto {
  @IsNumber()
  id: number;

  @IsString()
  orderedAt: string;

  @IsNumber()
  totalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartDto)
  cart: CartDto[];
}

export class UserIdDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class ParamsDto extends UserIdDto {
  @IsNumber()
  @Type(() => Number)
  orderId: number;
}

export class OrderBodyDto {
  @IsNumber()
  totalPrice: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartDto)
  cart: CartDto[];
}

export class OrderResponseDto extends MessageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  Order: OrderDto[];
}

export class SingleOrderResponseDto extends MessageDto {
  @Type(() => OrderDto)
  Order: OrderDto;
}
