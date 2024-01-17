import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import errorHandler from '@middleware/errorHandler';

import environmentHandler from '@lib/environmentHandler';
import serverConfig from '@config/server.config';
import prismaClient from '@lib/prisma';
import mainRouter from '@/routes';
/*import swaggerConfig from '@config/swagger.config';*/
import { jwtStrategy } from '@config/passport.config';

class App {
  public express: express.Application;
  private passport: passport.Authenticator;

  constructor() {
    this.express = express();
    this.passport = passport;
    this.setMiddleware();
    this.setRoutes();
    this.setErrorHandler();
    /*this.initializeDocs();*/
  }

  private setMiddleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(compression());
    this.express.use(passport.initialize);
    this.passport.use('jwt', jwtStrategy);
  }

  private setRoutes(): void {
    this.express.use(`/api`, mainRouter);
  }

  private setErrorHandler(): void {
    this.express.use(errorHandler);
  }

  /*  private initializeDocs(): void{
    expressJSDocSwagger(this.express)(swaggerConfig)
  }*/

  public async connectPrisma(): Promise<void> {
    await prismaClient.$connect();
  }
}

export default App;
