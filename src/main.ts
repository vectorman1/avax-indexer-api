import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { config as loadEnv } from 'dotenv';

loadEnv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
