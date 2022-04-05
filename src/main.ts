import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { useRequestLogging } from './middlewares/logger.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Akzakart API Server')
    .setDescription(
      'Akzkart API server is an e-commerce backend API server created using Nest framework.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local Server')
    .addServer(
      'https://nest-akzkart-api-production.up.railway.app',
      'Remote Server',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  useRequestLogging(app);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
