import util from 'util';
import { NextFunction, type Request, type Response } from 'express';
import { ApiError } from '@lib/apiErrors';
import winLogger from '@/lib/loggerWinston';
import statusCodes from '@utils/statusCodes';
import envVars from '@config/env.config';

interface ErrorBody {
  success: false;
  message: string;
  rawErrors?: string[];
  stack?: string;
}

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  winLogger.error(`Request Error:
        \nError:\n${JSON.stringify(err)}
        \nHeaders:\n${util.inspect(req.headers)}
        \nParams:\n${util.inspect(req.params)}
        \nQuery:\n${util.inspect(req.query)}
        \nBody:\n${util.inspect(req.body)}`);

  const status: number = err.statusCode ?? statusCodes.InternalServerError;

  const errorBody: ErrorBody = {
    success: false,
    message: err.message,
    rawErrors: err.rawErrors,
  };

  if (envVars.env === 'development') {
    errorBody.stack = err.stack;
  }

  res.status(status).send(errorBody);

  next();
};

export default errorHandler;
