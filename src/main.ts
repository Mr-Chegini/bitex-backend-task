import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryExceptionFilter } from './common/exception-filters/query-exception.filter';
import { ValidationPipe } from '@nestjs/common';

const port = parseInt(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new QueryExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`app listening on port ${port}`);
}
bootstrap();
