import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MessageDto } from 'src/models/message.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserIdDto } from 'src/models/user-id.dto';
import { PaginationDto } from 'src/models/pagination.dto';
import { ORDER_ENUM, RATING_ENUM, SORT, SORT_ENUM } from 'src/shared/constants';

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

export class ProductQueryDto extends PaginationDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsIn(SORT_ENUM)
  @IsOptional()
  sortBy?: number = SORT.TIME;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsIn(ORDER_ENUM)
  @IsOptional()
  sortOrder?: number = 1;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsIn(RATING_ENUM)
  @IsOptional()
  rating?: number = 0;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  priceStart?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsNotIn([0])
  @IsOptional()
  priceEnd?: number;
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
