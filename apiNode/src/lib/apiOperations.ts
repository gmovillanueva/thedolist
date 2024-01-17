import { type Response } from 'express';

import environment from '@/lib/environmentHandler';
import winLogger from '@/lib/loggerWinston';
import statusCodes from '@utils/statusCodes';

abstract class ApiOperations {
  public send<T>(
    res: Response,
    data: T,
    statusCode: number = statusCodes.Ok,
    message: string = 'success'
  ) {
    if (!environment.isDev()) {
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
    if (!environment.isDev()) {
      winLogger.info(`Download file: ${path}`);
    }

    res.status(statusCode).download(path);
  }
}

export default ApiOperations;
