import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import validationSchema from './config/validation';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './api/product/product.module';
import { CartModule } from './api/cart/cart.module';
import { OrderModule } from './api/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    ProductModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
