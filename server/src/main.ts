import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:9000', // Замените на адрес вашего фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные HTTP методы
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Разрешенные заголовки
  });
  await app.listen(5000);
}
bootstrap();
