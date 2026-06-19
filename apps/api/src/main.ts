import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Default to port 3333 as specified in the original environment variables
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
