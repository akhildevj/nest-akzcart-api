import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe as VP,
  ValidationPipeOptions,
} from '@nestjs/common';

export class ValidationPipe extends VP {
  constructor(private options?: ValidationPipeOptions) {
    super();
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    this.validatorOptions = {
      ...this.validatorOptions,
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: false,
      ...this.options,
    };
    try {
      const result = await super.transform(value, metadata);
      return result;
    } catch (error) {
      throw new BadRequestException(error.response.message);
    }
  }
}
