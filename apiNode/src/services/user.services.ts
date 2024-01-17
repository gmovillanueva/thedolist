import { type User } from '@prisma/client';
import LogMessage from '@utils/decorators/logMessage.decorators';
import prisma from '@/lib/prisma';

export default class UserService {
  @LogMessage<[User]>({ message: 'test-decorator' })
  public async createUser(data: User) {
    return prisma.user.create({ data });
  }
}
