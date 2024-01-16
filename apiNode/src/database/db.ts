import { drizzle } from 'drizzle-orm/postgres-js';
/*import PostgresService from '@/database/postgres.db.ts';*/
import { Client } from 'pg';

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '@/config/server.config.ts';
import winstonLogger from '../lib/loggerWinston';
export const postgresClient = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

await postgresClient
  .connect()
  .then(() => {
    winstonLogger.info(`Database connected successfully.`);
  })
  .catch((error) => {
    winstonLogger.error(`Database connection failed: ${error}`);
  });

export const db = drizzle(postgresClient);
