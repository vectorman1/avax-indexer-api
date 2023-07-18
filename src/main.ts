import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { config as loadEnv } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

loadEnv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AVAX Indexer API')
    .setDescription('An API for indexed AVAX blockchain data')
    .setVersion('0.1')
    .addTag('txs')
    .addTag('addresses')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
}

bootstrap();
