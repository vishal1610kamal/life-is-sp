import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { LoggerService } from 'logger-lib';

interface IError {
  message: string;
  code_error: string;
}

export class ExceptionLoggerUtils {
  constructor(private readonly logger: LoggerService) { }

  logMessage(request: any, message: IError, status: number, exception: any) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.url} method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}
                ${status >= 500 ? exception.stack : ''}`,
      );
    } else {
      this.logger.warn(
        `End Request for ${request.url} method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: ExceptionLoggerUtils;

  constructor(private readonly loggerUtil: ExceptionLoggerUtils) {
    this.logger = loggerUtil;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = exception.getStatus();
    let message = exception.getResponse() as IError;

    const responseData = {
      messages: [{ code: message.code_error ?? 'DT-ERR-1104', message: message.message, type: 'ERR' }],
    };

    this.logger.logMessage(request, message, status, exception);

    response.status(status).send(responseData);
  }
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger: ExceptionLoggerUtils;

  constructor(private readonly loggerUtil: ExceptionLoggerUtils) {
    this.logger = loggerUtil;
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, code_error: null };

    // let message = exception.getResponse() as IError;
    // const responseData = {
    //     ...{
    //         statusCode: status,
    //         timestamp: new Date().toISOString(),
    //         path: request.url,
    //         message: exception,
    //     },
    // };

    const responseData = {
      messages: [{ code: message.code_error ?? 'DT-ERR-1104', message: message.message, type: 'ERR' }],
    };

    this.logger.logMessage(request, message, status, exception);

    response.status(status).send(responseData);
  }
}
