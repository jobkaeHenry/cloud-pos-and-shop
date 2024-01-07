import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { QueryFailedFilter } from './filters/query-failed.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      //정한 dto외의 것은 버림
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.useGlobalFilters(new QueryFailedFilter());
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
