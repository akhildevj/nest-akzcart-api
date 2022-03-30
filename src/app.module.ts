import { Module } from '@nestjs/common';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}
