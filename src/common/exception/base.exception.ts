export interface BaseExceptionResponse {
    code: string;
    message: string;
}

export class BaseException extends Error {
    code: string;
    httpCode: number;

    constructor(message: string, params: { code: string; httpCode: number }) {
        super(message);
        this.code = params.code;
        this.httpCode = params.httpCode;
    }

    getResponse(): BaseExceptionResponse {
        return {
            code: this.code,
            message: this.message,
        };
    }
}
