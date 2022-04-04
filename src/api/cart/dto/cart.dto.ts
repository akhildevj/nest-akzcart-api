import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { MessageDto } from 'src/models/message.dto';

export class CartDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsNumber()
  quantity: number;
}

export class UserIdDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class CartBodyDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CartResponseDto extends MessageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartDto)
  cart: CartDto[];
}
