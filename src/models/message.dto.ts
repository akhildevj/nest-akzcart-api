import { IsBoolean, IsString } from 'class-validator';

export class MessageDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;
}
