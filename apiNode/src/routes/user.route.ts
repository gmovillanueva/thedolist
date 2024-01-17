import express from 'express';
import UserController from '@/controllers/user.controller';

const user: express.Router = express.Router();
const userController = new UserController();

user.post('/create', userController.createUser);

export default user;
