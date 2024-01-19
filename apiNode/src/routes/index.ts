import { Router } from 'express';
import envVars from '@config/env.config';

import authRouter from '@routes/auth.route';
import userRouter from '@routes/user.route';
import docRouter from '@routes/doc.route';

const mainRouter: Router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docRouter,
  },
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
  /*console.log(route.path);*/
});

if (envVars.env === 'development') {
  devRoutes.forEach((route) => {
    mainRouter.use(route.path, route.route);
  });
}

export default mainRouter;
