import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: AppLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `Method: ${req.method}`,
        `Response Status: ${res.statusCode}`,
        `Response Message: ${res.statusMessage}`,
        `URL: ${req.url}`,
        `Query params: ${JSON.stringify(req.query)}`,
        `Request Body: ${JSON.stringify(req.body)}`,
        `Response Body: ${JSON.stringify(res.json)}\n`,
        `HTTP`,
      );
    });

    next();
  }
}
