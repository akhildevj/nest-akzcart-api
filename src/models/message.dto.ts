import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @IsString()
  message: string;
}
