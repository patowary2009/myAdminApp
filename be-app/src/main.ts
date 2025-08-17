import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Specify the origin of your UI app
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
    allowedHeaders: 'Content-Type, Authorization', // Allowed request headers
  });
  await app.listen(process.env.PORT ?? 3200);
}
bootstrap();
