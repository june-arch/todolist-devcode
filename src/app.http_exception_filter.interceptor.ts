import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch(Error)
@Injectable({ scope: Scope.REQUEST })
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly config: ConfigService) {
    this.config = config;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let resErr: any = {};
    console.log(exception)
    if (this.config.get<string>('NODE_ENV') === 'prod' && status == 500) {
      resErr = {
        code: status,
        message: 'Internal server error',
      };
    } else {
      resErr =
        exception instanceof HttpException
          ? typeof exception.getResponse() === 'string'
            ? {}
            : exception.getResponse()
          : {
              code: status,
              message: 'Internal server error',
            };
    }
    console.log('errror 1');
    console.log(resErr);
    response.status(status).json({
      status: resErr.error,
      message: resErr.message,
      data: {},
    });
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly config: ConfigService) {
    this.config = config;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let resErr: any = {};

    if (this.config.get<string>('NODE_ENV') === 'prod' && status == 500) {
      resErr = {
        code: status,
        message: 'Internal server error',
      };
    } else {
      resErr =
        exception instanceof HttpException
          ? typeof exception.getResponse() === 'string'
            ? {}
            : exception.getResponse()
          : {
              code: status,
              message: 'Internal server error',
            };
    }

    console.log('errror 2');
    console.log(resErr);
    response.status(status).json({
      status: resErr.error,
      message: resErr.message,
      data: {},
    });
  }
}
