import cors from 'cors';
import express from 'express';

import environmentHandler from '@/lib/environmentHandler';
import serverConfig from '@config/server.config';
import prismaClient from '@/lib/prisma';

class Server {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddleware();
    this.setRoutes();
  }

  private setMiddleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private setRoutes(): void {
    const {
      api: { version },
    } = serverConfig;
    const { env } = environmentHandler;
    this.express.use('/', home);
    this.express.use(`/api/${version}/${env}`, routes);
  }

  public async connectPrisma(): Promise<void> {
    await prismaClient.$connect();
  }
}

export default Server;
