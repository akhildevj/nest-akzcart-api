import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CartDto } from 'src/api/cart/dto/cart.dto';
import { MessageDto } from 'src/models/message.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserIdDto } from 'src/models/user-id.dto';

export class OrderDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  orderedAt: string;

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ type: [CartDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartDto)
  cart: CartDto[];
}

export class ParamsDto extends UserIdDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  orderId: number;
}

export class OrderResponseDto extends MessageDto {
  @ApiProperty({ type: [OrderDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  Order: OrderDto[];
}

export class SingleOrderResponseDto extends MessageDto {
  @ApiProperty({ type: OrderDto })
  @Type(() => OrderDto)
  Order: OrderDto;
}
