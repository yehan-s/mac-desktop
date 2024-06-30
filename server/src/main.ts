import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用CORS
  app.enableCors();
  // 启用Helmet
  app.use(helmet());
  // 全局使用 ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  // TODO: 端口写入环境变量
  await app.listen(3000);
}
bootstrap();
