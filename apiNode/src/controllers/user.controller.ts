import { type NextFunction, type Request } from 'express';
import { type User } from '@prisma/client';
import ApiOperations from '@/lib/apiOperations';
import UserService from '@/services/user.services';
import { CustomResponse } from '@/types/common.types';
import statusCodes from '@utils/statusCodes';

export default class UserController extends ApiOperations {
  private readonly userService = new UserService();

  public createUser = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      this.send(res, user, statusCodes.Created, 'createUser');
    } catch (e) {
      next(e);
    }
  };
}
