import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { MessageDto } from 'src/models/message.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserIdDto } from 'src/models/user-id.dto';

export class ProductDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  price: number;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  rating: number;

  @ApiProperty()
  @IsString()
  description: string;
}

export class ProductIdDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class ParamsDto extends UserIdDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  productId: number;
}

export class ProductBodyDto {
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
  @IsString()
  description: string;
}

export class AllProductsResponseDto extends MessageDto {
  @ApiProperty({ type: [ProductDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}

export class ProductDetailsResponseDto extends MessageDto {
  @ApiProperty({ type: ProductDto })
  @Type(() => ProductDto)
  product: ProductDto;
}

export class productRatingBodyDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  rating: number;
}
