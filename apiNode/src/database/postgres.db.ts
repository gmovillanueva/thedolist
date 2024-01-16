import { Client } from 'pg';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '@/config/server.config.ts';

export default class PostgresService {
  public readonly connection: Client;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;

  constructor() {
    this.dbName = DB_NAME;
    this.dbUser = DB_USER;
    this.dbPassword = DB_PASSWORD;
    this.dbHost = DB_HOST;
    this.dbPort = DB_PORT;
    this.connection = this.postgresConnection();
  }

  private postgresConnection(): Client {
    return new Client({
      host: this.dbHost,
      port: this.dbPort,
      user: this.dbUser,
      password: this.dbPassword,
      database: this.dbName,
    });
  }

  public connect(): Client {
    return this.postgresConnection();
  }

  public close() {
    return this.connection.end();
  }
}
