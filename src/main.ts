// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Equivalent to FastAPI's CORS middleware
  app.enableCors();

  // Default is port 3000; yours is 9090 in FastAPI
  await app.listen(9090, () => {
    console.log('NestJS app running on http://0.0.0.0:9090');
  });
}
bootstrap();
