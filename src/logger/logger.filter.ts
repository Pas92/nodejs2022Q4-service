import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { HttpAdapterHost } from '@nestjs/core';
import { AppLogger } from './logger.service';

@Catch()
export class LoggerFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private logger: AppLogger,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : `Internal server error`;

    const stack =
      exception instanceof HttpException ? exception.stack : `unknown`;

    const errorName =
      exception instanceof HttpException ? exception.name : `Unknown error`;

    this.logger.error(
      `Status: ${status}`,
      `Message: ${message}`,
      `Stack: ${stack}`,
      errorName,
    );

    const responseBody = {
      status,
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
