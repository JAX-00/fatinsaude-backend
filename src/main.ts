import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter} from './common/filters/prisma-exception.filter';
import { join } from 'path';

// 🔥 tambahkan ini
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new PrismaExceptionFilter())
  
  app.enableCors({
    origin: ['http://localhost:3000'], // frontend
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  prefix: '/uploads',
  });

  await app.listen(4000);
}
bootstrap();
