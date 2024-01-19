import { Request } from 'express';
import { type User } from '@prisma/client';
import ApiOperations from '@/lib/apiOperations';
import UserService from '@services/user.service';
import { CustomResponse } from '@types/common.type';
import statusCodes from '@utils/statusCodes';
import catchAsync from '@utils/catchAsync';
import picker from '@utils/picker';
import { ApiError } from '@lib/apiErrors';

export default class UserController extends ApiOperations {
  private readonly userService = new UserService();

  public createUser = catchAsync(
    async (req: Request, res: CustomResponse<User>) => {
      const { email, password, name, role } = req.body;
      const user = await this.userService.createUser(
        email,
        password,
        name,
        role
      );
      this.send(res, user, statusCodes.Created, 'createUser');
    }
  );

  public getUsers = catchAsync(
    async (req: Request, res: CustomResponse<User>) => {
      const filter = picker(req.query, ['name', 'role']);
      const options = picker(req.query, ['sortBy', 'limit', 'page']);
      const result = await this.userService.queryUsers(filter, options);
      this.send(res, result, statusCodes.Created, 'createUser');
    }
  );

  public getUser = catchAsync(
    async (req: Request, res: CustomResponse<User>) => {
      const user = await this.userService.getUserById(
        Number(req.params.userId)
      );
      if (!user) {
        throw new ApiError(
          statusCodes.NotFound,
          `User: ${req.params.userId} not found.`
        );
      }
      this.send(
        res,
        user,
        statusCodes.Found,
        `User: ${req.params.userId} found.`
      );
    }
  );

  public updateUser = catchAsync(
    async (req: Request, res: CustomResponse<User>) => {
      const user = await this.userService.updateUserById(
        Number(req.params.userId),
        req.body
      );
      this.send(
        res,
        user,
        statusCodes.Accepted,
        `User: ${req.params.userId} updated.`
      );
    }
  );

  public deleteUser = catchAsync(
    async (req: Request, res: CustomResponse<User>) => {
      const user = await this.userService.deleteUserById(
        Number(req.params.userId)
      );
      this.send(
        res,
        user,
        statusCodes.NO_CONTENT,
        `User: ${req.params.userId} deleted.`
      );
    }
  );
}
