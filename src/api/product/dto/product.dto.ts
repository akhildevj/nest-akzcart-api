import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsString()
  name: string;

  @IsString()
  price: number;

  @IsString()
  rating: number;

  @IsString()
  description: string;
}

export class ProductIdDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class ProductBodyDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsString()
  description: string;
}

export class MessageDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;
}

export class AllProductsResponseDto extends MessageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}

export class ProductDetailsResponseDto extends MessageDto {
  @Type(() => ProductDto)
  product: ProductDto;
}
