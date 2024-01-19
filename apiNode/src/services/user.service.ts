import { User, Role, Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';
import { encryptPassword } from '@utils/encryption';
import statusCodes from '@utils/statusCodes';
import { ApiError } from '@lib/apiErrors';

export default class UserService {
  /**
   * Create a user
   * @returns {Promise<User>}
   * @param email
   * @param password
   * @param name
   * @param role
   */
  public async createUser(
    email: string,
    password: string,
    name?: string,
    role: Role = Role.USER
  ): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        name,
        password: await encryptPassword(password),
        role,
      },
    });
  }

  /**
   * Query for users
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param keys
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<User, Key>}
   */
  public async queryUsers<Key extends keyof User>(
    filter: object,
    options: {
      limit?: number;
      page?: number;
      sortBy?: string;
      sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
      'id',
      'email',
      'name',
      'password',
      'role',
      'isEmailVerified',
      'createdAt',
      'updatedAt',
    ] as Key[]
  ): Promise<Pick<User, Key>[]> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const users = await prisma.user.findMany({
      where: filter,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      skip: page * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortType } : undefined,
    });
    return users as Pick<User, Key>[];
  }

  /**
   * Get user by id
   * @param {Object} id
   * @param {Array<Key>} keys
   * @returns {Promise<Pick<User, Key> | null>}
   */
  public async getUserById<Key extends keyof User>(
    id: number,
    keys: Key[] = [
      'id',
      'email',
      'name',
      'password',
      'role',
      'isEmailVerified',
      'createdAt',
      'updatedAt',
    ] as Key[]
  ): Promise<Pick<User, Key> | null> {
    return prisma.user.findUnique({
      where: { id },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<User, Key> | null>;
  }

  /**
   * Get user by email
   * @param {string} email
   * @param {Array<Key>} keys
   * @returns {Promise<Pick<User, Key> | null>}
   */
  public async getUserByEmail<Key extends keyof User>(
    email: string,
    keys: Key[] = [
      'id',
      'email',
      'name',
      'password',
      'role',
      'isEmailVerified',
      'createdAt',
      'updatedAt',
    ] as Key[]
  ): Promise<Pick<User, Key> | null> {
    return prisma.user.findUnique({
      where: { email },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<User, Key> | null>;
  }

  /**
   * Update user by id
   * @param {Object} userId
   * @param {Object} updateBody
   * @param keys
   * @returns {Promise<User>}
   */
  public async updateUserById<Key extends keyof User>(
    userId: number,
    updateBody: Prisma.UserUpdateInput,
    keys: Key[] = ['id', 'email', 'name', 'role'] as Key[]
  ): Promise<Pick<User, Key> | null> {
    const user = await this.getUserById(userId, ['id', 'email', 'name']);
    if (!user) {
      throw new ApiError(statusCodes.NOT_FOUND, 'User not found');
    }
    if (
      updateBody.email &&
      (await this.getUserByEmail(updateBody.email as string))
    ) {
      throw new ApiError(statusCodes.BAD_REQUEST, 'Email already taken');
    }
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateBody,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });
    return updatedUser as Pick<User, Key> | null;
  }

  /**
   * Delete user by id
   * @param {Object} userId
   * @returns {Promise<User>}
   */
  public async deleteUserById(userId: number): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(statusCodes.NOT_FOUND, 'User not found');
    }
    await prisma.user.delete({ where: { id: user.id } });
    return user;
  }
}
