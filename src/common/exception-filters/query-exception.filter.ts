import { Request } from 'express';
import { Catch, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter {
  catch(exception: QueryFailedError, host) {
    const errorCode: HttpStatus | string = HttpStatus.INTERNAL_SERVER_ERROR; // Default to internal server error
    let message = 'Database error';
    const meta = {
      databaseErrorMessage: exception.message,
      databaseErrorName: exception.name,
    };

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    const msg = {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      errorCode,
      meta,
    };

    response.status(errorCode).json(msg);
  }
}
