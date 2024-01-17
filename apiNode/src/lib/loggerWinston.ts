import { existsSync, mkdirSync } from 'fs';

import winston from 'winston';

import serverConfig from '@config/server.config';
import { LOG_DATE_FORMAT } from '@utils/constants';

import envVars from '@config/env.config';

const {
  logs: { dir: logDir, logFile, errorLogFile },
} = serverConfig;

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const logTransports: winston.transport[] = [new winston.transports.Console()];
const fileTransports: winston.transport[] = [
  new winston.transports.File({
    filename: `${logDir}/${errorLogFile}`,
    level: 'error',
  }),
  new winston.transports.File({ filename: `${logDir}/${logFile}` }),
];

if (envVars.env !== 'development') {
  logTransports.push(...fileTransports);
}

const { printf, combine, label, timestamp, json, prettyPrint } = winston.format;

const logFormattter = printf(({ level, message, label, timestamp }) => {
  return `[${String(label)}] ${String(timestamp)} ${level}: ${String(message)}`;
});

const winLogger: winston.Logger = winston.createLogger({
  format: combine(
    label({ label: envVars.env }),
    timestamp({ format: LOG_DATE_FORMAT }),
    json(),
    prettyPrint({ colorize: true }),
    logFormattter
  ),
  transports: logTransports,
});

export const logWithoutConsole = (logEntry: winston.LogEntry) => {
  const consoleTransport = winLogger.transports.find(
    (transport) => transport instanceof winston.transports.Console
  );
  const fileTransport = winLogger.transports.find(
    (transport) => transport instanceof winston.transports.File
  );

  if (!fileTransport) {
    fileTransports.forEach((transport) => winLogger.add(transport));
  }

  if (!consoleTransport) {
    winLogger.log(logEntry);
    return;
  }

  winLogger.remove(consoleTransport);
  winLogger.log(logEntry);
  winLogger.add(consoleTransport);
};

export default winLogger;
