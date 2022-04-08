import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotIn, IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsNotIn([0])
  @IsOptional()
  limit?: number = 8;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  offset?: number = 0;
}
