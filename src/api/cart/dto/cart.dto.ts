import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { MessageDto } from 'src/models/message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class UserIdDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class CartBodyDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CartResponseDto extends MessageDto {
  @ApiProperty({ type: [CartDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartDto)
  cart: CartDto[];
}
