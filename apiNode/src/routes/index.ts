import { Router } from 'express';

import user from '@/routes/user.route';

const mainRouter: Router = Router();

mainRouter.use('/user', user);

export default mainRouter;
