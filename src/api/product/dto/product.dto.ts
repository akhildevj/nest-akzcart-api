import { IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  price: number;

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

  @IsString()
  price: number;

  @IsString()
  description: string;
}

export class MessageDto {
  @IsString()
  success: boolean;

  @IsString()
  message: string;
}
