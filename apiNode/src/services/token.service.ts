import jwt from 'jsonwebtoken';
import dayjs, { Dayjs } from 'dayjs';
import envConfig from '@config/env.config';
import { Token, TokenType } from '@prisma/client';
import prisma from '@/lib/prisma';
import UserService from '@services/user.service';
import statusCodes from '@utils/statusCodes';
import { ApiError } from '@lib/apiErrors';

export default class TokenService {
  private readonly userService = new UserService();
  /**
   * Generate token
   * @param {number} userId
   * @param {Dayjs} expires
   * @param {string} type
   * @param {string} [secret]
   * @returns {string}
   */
  public async generateToken(
    userId: number,
    expires: Dayjs,
    type: TokenType,
    secret: string = envConfig.jwt.secret
  ): Promise<string> {
    const payload = {
      sub: userId,
      iat: dayjs().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  }

  /**
   * Save a token
   * @param {string} token
   * @param {number} userId
   * @param {Dayjs} expires
   * @param {string} type
   * @param {boolean} [blacklisted]
   * @returns {Promise<Token>}
   */
  public async saveToken(
    token: string,
    userId: number,
    expires: Dayjs,
    type: TokenType,
    blacklisted: boolean = false
  ): Promise<Token> {
    return prisma.token.create({
      data: {
        token,
        userId: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
      },
    });
  }

  /**
   * Verify token and return token doc (or throw an error if it is not valid)
   * @returns {Promise<Token>}
   */
  public async verifyToken(token: string, type: TokenType): Promise<Token> {
    const payload = jwt.verify(token, envConfig.jwt.secret);
    const userId = Number(payload.sub);

    const tokenData = await prisma.token.findFirst({
      where: { token, type, userId, blacklisted: false },
    });

    if (!tokenData) {
      throw new Error('Token not found');
    }

    return tokenData;
  }

  /**
   * Generate auth tokens
   * @param {User} user
   * @returns {Promise<AuthTokensResponse>}
   */
  public async generateAuthTokens(user: { id: number }): Promise<{
    access: { expires: Date; token: Promise<string> };
    refresh: { expires: Date; token: Promise<string> };
  }> {
    const accessTokenExpires = dayjs().add(
      envConfig.jwt.accessExpirationMinutes,
      'minutes'
    );

    const accessToken = this.generateToken(
      user.id,
      accessTokenExpires,
      TokenType.ACCESS
    );

    const refreshTokenExpires = dayjs().add(
      envConfig.jwt.refreshExpirationDays,
      'days'
    );

    const refreshToken = this.generateToken(
      user.id,
      refreshTokenExpires,
      TokenType.REFRESH
    );

    await this.saveToken(
      await refreshToken,
      user.id,
      refreshTokenExpires,
      TokenType.REFRESH
    );

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  /**
   * Generate reset password token
   * @param {string} email
   * @returns {Promise<string>}
   */
  public async generateResetPasswordToken(email: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(
        statusCodes.NotFound,
        'No users found with this email'
      );
    }
    const expires = dayjs().add(envConfig.jwt.passwordResetTimer, 'minutes');
    const resetPasswordToken = this.generateToken(
      user.id as number,
      expires,
      TokenType.RESET_PASSWORD
    );
    await this.saveToken(
      await resetPasswordToken,
      user.id as number,
      expires,
      TokenType.RESET_PASSWORD
    );
    return resetPasswordToken;
  }

  /**
   * Generate verify email token
   * @param {User} user
   * @returns {Promise<string>}
   */
  public async generateVerifyEmailToken(user: { id: number }): Promise<string> {
    const expires = dayjs().add(envConfig.jwt.emailVerifyEmailTimer, 'minutes');
    const verifyEmailToken = this.generateToken(
      user.id,
      expires,
      TokenType.VERIFY_EMAIL
    );
    await this.saveToken(
      await verifyEmailToken,
      user.id,
      expires,
      TokenType.VERIFY_EMAIL
    );
    return verifyEmailToken;
  }
}
