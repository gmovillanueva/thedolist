import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import errorHandler from '@middleware/errorHandler';

import prismaClient from '@lib/prisma';
import mainRouter from '@/routes';
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
    this.express.options('*', cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(compression());
    this.express.use(passport.initialize());
    this.passport.use('jwt', jwtStrategy);
  }

  private setRoutes(): void {
    /*    this.express.use('/', () => {
      console.log('Someone is home.');
    });*/
    this.express.use('/', mainRouter);
  }

  private setErrorHandler(): void {
    this.express.use(errorHandler);
  }

  public async connectPrisma(): Promise<void> {
    await prismaClient.$connect();
  }
}

export default App;
