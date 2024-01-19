import { Response } from 'express';
import morgan from 'morgan';
import envConfig from '@config/env.config';
import winLogger from '@lib/loggerWinston';

morgan.token(
  'message',
  (_req: any, res: Response) => res.locals.errorMessage || ''
);

const getIpFormat = () =>
  envConfig.env === 'production' ? ':remote-address - ' : '';

const successFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successFormat, {
  skip: (_req: any, res: { statusCode: number }) => res.statusCode >= 400,
  stream: { write: (message: string) => winLogger.info(message.trim()) },
});

export const errorHandler = morgan(errorFormat, {
  skip: (_req: any, res: { statusCode: number }) => res.statusCode < 400,
  stream: { write: (message: string) => winLogger.error(message.trim()) },
});

export default {
  successHandler,
  errorHandler,
};
