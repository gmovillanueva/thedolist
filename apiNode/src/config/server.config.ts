import dotenv from 'dotenv';
import path from 'path';
import { DEFAULT_PORT } from '@utils/constants';

dotenv.config({ path: path.resolve('.env') });

interface ServerConfig {
  api: {
    basePath: string;
    version: string;
  };
  docs: {
    swaggerUIPath: string;
    apiDocsPath: string;
  };
  logs: {
    dir: string;
    logFile: string;
    errorLogFile: string;
  };
  defaultPort: number;
}

const serverConfig: ServerConfig = {
  api: {
    basePath: 'api',
    version: 'v1',
  },
  docs: {
    swaggerUIPath: '/v1/swagger',
    apiDocsPath: '/v1/api-docs',
  },
  logs: {
    dir: './logs',
    logFile: 'server.log',
    errorLogFile: 'server.error.log',
  },
  defaultPort: DEFAULT_PORT,
};

export default serverConfig;

// Server Config
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 4000;

// DB Configuration
export const DB_NAME = process.env.DB_NAME || '';
export const DB_USER = process.env.DB_USER || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_HOST = process.env.DB_HOST || '';
export const DB_PORT = (process.env.DB_PORT as unknown as number) || 5432;

export const WHITELIST = ['http://localhost:4000'];
