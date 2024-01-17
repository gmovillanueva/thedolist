import statusCodes from '@utils/statusCodes';

export interface IApiError extends Error {
  statusCode: number;
  rawErrors?: string[];
}

export class ApiError extends Error implements IApiError {
  statusCode: number;
  rawErrors: string[] | undefined;

  constructor(statusCode: number, message: string, rawErrors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    if (rawErrors) {
      this.rawErrors = rawErrors;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTPBadRequestError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(statusCodes.BadRequest, message, errors);
  }
}

export class HTTPInternalServerError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(statusCodes.InternalServerError, message, errors);
  }
}

export class HTTPUnauthorizedError extends ApiError {
  constructor(message: string) {
    super(statusCodes.Unauthorized, message);
  }
}

export class HTTPNotFoundError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(statusCodes.NotFound, message, errors);
  }
}
