import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import validationSchema from './config/validation';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    ProductModule,
  ],
})
export class AppModule {}
