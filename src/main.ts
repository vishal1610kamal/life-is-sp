import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import {
  AllExceptionFilter,
  ExceptionLoggerUtils,
  HttpExceptionFilter,
} from './infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from './infrastructure/common/interceptors/response.interceptor';
import { LoggerService } from 'logger-lib';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { LoggerConfig } from './infrastructure/config/logger/logger.config';
import { Environment } from './infrastructure/common/constants/constants';
import { TransactionInterceptor } from './infrastructure/common/interceptors/transaction.interceptor';
import { DataSource } from 'typeorm';
import databaseConfig from './infrastructure/config/typeorm/typeorm.config';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // using helmet for headers
  await app.register(helmet);

  // csrf protection
  await app.register(fastifyCsrf);

  // enabling cors
  app.enableCors();

  //app.use(cookieParser());

  // Filter
  // Importing order of the custom filters are IMPORTANT
  app.useGlobalFilters(
    new AllExceptionFilter(new ExceptionLoggerUtils(new LoggerService(new LoggerConfig()))),
    new HttpExceptionFilter(new ExceptionLoggerUtils(new LoggerService(new LoggerConfig()))),
  );

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService(new LoggerConfig())));
  app.useGlobalInterceptors(new ResponseInterceptor());
  //app.useGlobalInterceptors(new TransactionInterceptor(new DataSource(databaseConfig)));

  // base routing version
  app.setGlobalPrefix('v1');

  // swagger config
  if (env !== Environment.PRODUCTION) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Dubai Trade Berth Booking Module')
      .setDescription('This is a Berth Booking module created in Nest.js backend service')
      .setVersion(process.env.API_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });

    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error(err);
});
