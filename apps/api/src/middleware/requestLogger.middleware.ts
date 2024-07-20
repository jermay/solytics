import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 *  Simple request logger for debugging purposes that uses the console
 */
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const message = `${method} ${originalUrl}`;

    Logger.log(message, 'IncomingRequest');
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const responseMessage = `${method} ${statusCode} ${duration}ms ${originalUrl}`;
      Logger.log(responseMessage, 'OutgoingResponse');
    });

    next();
  }
}
