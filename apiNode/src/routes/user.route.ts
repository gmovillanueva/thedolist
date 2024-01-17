import { Router } from 'express';
import UserController from '@/controllers/user.controller';

const user: Router = Router();
const userController = new UserController();

user.post('/create', userController.createUser);

export default user;
