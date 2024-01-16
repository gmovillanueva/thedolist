import winston from 'winston';

import { LOGGER } from '@config/server.config';

export interface Logger {
  level: 'info' | 'debug' | 'error' | 'warn';
}

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: '/tmp/error.log', level: 'error' }),
    new winston.transports.File({ filename: '/tmp/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(
    new winston.transports.Console({
      level: LOGGER.level,
      format: winston.format.simple(),
    })
  );
}
export default winstonLogger;
