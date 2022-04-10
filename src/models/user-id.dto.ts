import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserIdDto {
  @ApiProperty()
  @IsString()
  id: string;
}
