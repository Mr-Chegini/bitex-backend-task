import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryExceptionFilter } from './common/exception-filters/query-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './common/swagger/swagger';

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

  SwaggerModule.setup('api', app, createDocument(app));
  await app.listen(port);
  console.log(`app listening on port ${port}`);
}
bootstrap();
