import nodemailer, { createTransport } from 'nodemailer';
import envConfig from '@config/env.config';
export default class EmailService {
  private mailman: nodemailer.Transporter;

  constructor() {
    this.mailman = createTransport(envConfig.email.smtp);
  }

  /**
   * Send an email
   * @param {string} to
   * @param {string} subject
   * @param {string} text
   * @returns {Promise}
   */
  public async sendEmail(
    to: string,
    subject: string,
    text: string
  ): Promise<any> {
    const msg = { from: envConfig.email.from, to, subject, text };
    await this.mailman.sendMail(msg);
  }

  /**
   * Send reset password email
   * @param {string} to
   * @param {string} token
   * @returns {Promise}
   */
  public async sendResetPasswordEmail(to: string, token: string): Promise<any> {
    const subject = 'Reset password';
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
    const text = `User, To reset your password, click on this link: ${resetPasswordUrl} If you did not request any password resets, then ignore this email.`;
    await this.sendEmail(to, subject, text);
  }

  /**
   * Send verification email
   * @param {string} to
   * @param {string} token
   * @returns {Promise}
   */
  public async sendVerificationEmail(to: string, token: string): Promise<any> {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
    const text = `User, To verify your email, click on this link: ${verificationEmailUrl}`;
    await this.sendEmail(to, subject, text);
  }
}
