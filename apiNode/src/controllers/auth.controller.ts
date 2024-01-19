import ApiOperations from '@lib/apiOperations';
import catchAsync from '@utils/catchAsync';
import statusCodes from '@utils/statusCodes';
import exclude from '@utils/exclude';
import UserService from '@services/user.service';
import TokenService from '@services/token.service';
import AuthService from '@services/auth.service';
import EmailService from '@services/email.service';
import statusCode from '@utils/statusCodes';
import { User } from '@prisma/client';

export default class AuthController extends ApiOperations {
  private readonly userService = new UserService();
  private readonly tokenService = new TokenService();
  private readonly authService = new AuthService();
  private readonly emailService = new EmailService();

  public register = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await this.userService.createUser(email, password);
    const userWithoutPassword = exclude(user, [
      'password',
      'createdAt',
      'updatedAt',
    ]);
    const tokens = await this.tokenService.generateAuthTokens(user);
    res.status(statusCodes.Created).send({ user: userWithoutPassword, tokens });
  });

  public login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await this.authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    const tokens = await this.tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  });

  public logout = catchAsync(async (req, res) => {
    await this.authService.logout(req.body.refreshToken);
    res.status(statusCodes.NoContent).send();
  });

  public refreshTokens = catchAsync(async (req, res) => {
    const tokens = await this.authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  });

  public forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken =
      await this.tokenService.generateResetPasswordToken(req.body.email);
    await this.emailService.sendResetPasswordEmail(
      req.body.email,
      resetPasswordToken
    );
    res.status(statusCode.NoContent).send();
  });

  public resetPassword = catchAsync(async (req, res) => {
    await this.authService.resetPassword(
      req.query.token as string,
      req.body.password
    );
    res.status(statusCode.NoContent).send();
  });

  public sendVerificationEmail = catchAsync(async (req, res) => {
    const user = req.user as User;
    const verifyEmailToken =
      await this.tokenService.generateVerifyEmailToken(user);
    await this.emailService.sendVerificationEmail(user.email, verifyEmailToken);
    res.status(statusCode.NoContent).send();
  });

  public verifyEmail = catchAsync(async (req, res) => {
    await this.authService.verifyEmail(req.query.token as string);
    res.status(statusCode.NoContent).send();
  });
}
