import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoggerFilter } from './logger/logger.filter';
import { Logger, LogLevel } from '@nestjs/common';
import { AppLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Exception filters
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = app.get(AppLogger);
  app.useGlobalFilters(new LoggerFilter(httpAdapter, logger));

  //Port
  const appConfig = app.get(ConfigService);
  const port = appConfig.get('PORT');

  //Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library service')
    .setDescription('Home Library service REST API by Pas92')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
