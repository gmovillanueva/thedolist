import express from 'express';
import auth from '@middleware/auth';
import validate from '@middleware/validate';
import UserController from '@/controllers/user.controller';
import { userValidation } from '@/validations';

const userRouter: express.Router = express.Router();
const userController = new UserController();

userRouter
  .route('/')
  .post(
    auth('manageUsers'),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    auth('getUsers'),
    validate(userValidation.getUsers),
    userController.getUsers
  );

userRouter
  .route('/:userId')
  .get(
    auth('getUsers'),
    validate(userValidation.getUser),
    userController.getUser
  )
  .patch(
    auth('manageUsers'),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth('manageUsers'),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

export default userRouter;
