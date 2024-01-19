import express from 'express';
import validate from '@middleware/validate';
import { authValidation } from '@/validations';
import AuthController from '@controllers/auth.controller';
import auth from '@middleware/auth';

const authRouter: express.Router = express.Router();
const authController = new AuthController();

authRouter.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

authRouter.post('/login', validate(authValidation.login), authController.login);

authRouter.post(
  '/logout',
  validate(authValidation.logout),
  authController.logout
);

authRouter.post(
  '/refreshTokens',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

authRouter.post(
  '/forgotPassword',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

authRouter.post(
  '/resetPassword',
  validate(authValidation.resetPassword),
  authController.resetPassword
);

authRouter.post(
  '/sendVerificationEmail',
  auth(),
  authController.sendVerificationEmail
);

authRouter.post(
  '/verifyEmail',
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

export default authRouter;
