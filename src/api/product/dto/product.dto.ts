import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  id: string;

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
  @IsString()
  id: string;
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
  products: ProductDto[];
}

export class ProductDetailsResponseDto extends MessageDto {
  product: ProductDto;
}
