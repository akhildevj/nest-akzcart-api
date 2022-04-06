import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserBodyDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;
}
