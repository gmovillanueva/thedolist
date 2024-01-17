import { type Response } from 'express';

import winLogger from '@/lib/loggerWinston';
import statusCodes from '@utils/statusCodes';
import envVars from '@config/env.config';

abstract class ApiOperations {
  public send<T>(
    res: Response,
    data: T,
    statusCode: number = statusCodes.Ok,
    message: string = 'success'
  ) {
    if (envVars.env !== 'development') {
      winLogger.info(JSON.stringify(data, null, 2));
    }

    return res.status(statusCode).json({
      message,
      data,
    });
  }

  public download(
    res: Response,
    statusCode: number = statusCodes.Ok,
    path: string
  ) {
    if (envVars.env !== 'development') {
      winLogger.info(`Download file: ${path}`);
    }

    res.status(statusCode).download(path);
  }
}

export default ApiOperations;
