import { Router } from 'express';
import envVars from '@config/env.config';

import user from '@/routes/user.route';
import docRouter from '@routes/doc.route';

const mainRouter: Router = Router();

const devRoutes = [
  {
    path: '/docs',
    route: docRouter,
  },
];

if (envVars.env === 'development') {
  devRoutes.forEach((route) => {
    mainRouter.use(route.path, route.route);
  });
}

mainRouter.use('/user', user);

export default mainRouter;
