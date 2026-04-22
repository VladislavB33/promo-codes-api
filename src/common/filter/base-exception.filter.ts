import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { BaseException } from '../exception/base.exception';

@Catch(BaseException)
export class BaseExceptionFilter implements ExceptionFilter {
    catch(exception: BaseException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(exception.httpCode).json(exception.getResponse());
    }
}
