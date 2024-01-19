import { TokenType, User } from '@prisma/client';
import prisma from '@/lib/prisma';
import UserService from '@services/user.service';
import statusCodes from '@utils/statusCodes';
import { ApiError } from '@lib/apiErrors';
import exclude from '@utils/exclude';
import { encryptPassword, passwordMatch } from '@utils/encryption';
import TokenService from '@services/token.service';

export default class AuthService {
  private readonly userService = new UserService();
  private readonly tokenService = new TokenService();

  /**
   * Login with username and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Omit<User, 'password'>>}
   */
  public async loginUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getUserByEmail(email, [
      'id',
      'email',
      'name',
      'password',
      'role',
      'isEmailVerified',
      'createdAt',
      'updatedAt',
    ]);
    if (!user || !(await passwordMatch(password, user.password as string))) {
      throw new ApiError(
        statusCodes.Unauthorized,
        'Incorrect email or password'
      );
    }
    return exclude(user, ['password']);
  }

  /**
   * Logout
   * @param {string} refreshToken
   * @returns {Promise<void>}
   */
  public async logout(refreshToken: string): Promise<void> {
    const refreshTokenData = await prisma.token.findFirst({
      where: {
        token: refreshToken,
        type: TokenType.REFRESH,
        blacklisted: false,
      },
    });
    if (!refreshTokenData) {
      throw new ApiError(statusCodes.NotFound, 'Logout: Token not found');
    }
    await prisma.token.delete({ where: { id: refreshTokenData.id } });
  }

  /**
   * Refresh auth tokens
   * @param {string} refreshToken
   * @returns {Promise<AuthTokensResponse>}
   */
  public async refreshAuth(refreshToken: string): Promise<{
    access: { expires: Date; token: Promise<string> };
    refresh: { expires: Date; token: Promise<string> };
  }> {
    try {
      const refreshTokenData = await this.tokenService.verifyToken(
        refreshToken,
        TokenType.REFRESH
      );
      const { userId } = refreshTokenData;
      await prisma.token.delete({ where: { id: refreshTokenData.id } });
      return this.tokenService.generateAuthTokens({ id: userId });
    } catch (error) {
      throw new ApiError(statusCodes.Unauthorized, 'Please authenticate.');
    }
  }

  /**
   * Reset password
   * @param {string} resetPasswordToken
   * @param {string} newPassword
   * @returns {Promise<void>}
   */
  public async resetPassword(
    resetPasswordToken: string,
    newPassword: string
  ): Promise<void> {
    try {
      const resetPasswordTokenData = await this.tokenService.verifyToken(
        resetPasswordToken,
        TokenType.RESET_PASSWORD
      );
      const user = await this.userService.getUserById(
        resetPasswordTokenData.userId
      );
      if (!user) {
        throw new Error();
      }
      const encryptedPassword = await encryptPassword(newPassword);
      await this.userService.updateUserById(user.id, {
        password: encryptedPassword,
      });
      await prisma.token.deleteMany({
        where: { userId: user.id, type: TokenType.RESET_PASSWORD },
      });
    } catch (error) {
      throw new ApiError(statusCodes.Unauthorized, 'Password reset failed.');
    }
  }

  /**
   * Verify email
   * @param {string} verifyEmailToken
   * @returns {Promise<void>}
   */
  public async verifyEmail(verifyEmailToken: string): Promise<void> {
    try {
      const verifyEmailTokenData = await this.tokenService.verifyToken(
        verifyEmailToken,
        TokenType.VERIFY_EMAIL
      );
      await prisma.token.deleteMany({
        where: {
          userId: verifyEmailTokenData.userId,
          type: TokenType.VERIFY_EMAIL,
        },
      });
      await this.userService.updateUserById(verifyEmailTokenData.userId, {
        isEmailVerified: true,
      });
    } catch (error) {
      throw new ApiError(
        statusCodes.Unauthorized,
        'Email verification failed.'
      );
    }
  }
}
