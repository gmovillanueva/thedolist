import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    SERVER_PORT: Joi.number().default(3000),
    SERVER_URL: Joi.string().required().description('Server URL'),
    JWT_SECRET: Joi.string().required().description('JWT Secret'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('Time (min) for access token to expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('Time (min) for refresh tokens expire'),
    JWT_VERIFY_EMAIL_TOKEN_TIMER: Joi.number()
      .default(15)
      .description('Time (min) for verify email token to expire.'),
    JWT_RESET_PASSWORD_TOKEN_TIMER: Joi.number()
      .default(15)
      .description('Time (min) for reset password token to expire.'),
    SMTP_HOST: Joi.string().description('Server that sends emails.'),
    SMTP_PORT: Joi.number().description('Server Port that sends emails.'),
    SMTP_USERNAME: Joi.string().description('Username for email server.'),
    SMTP_PASSWORD: Joi.string().description('Password for email server.'),
    EMAIL_FROM: Joi.string().description('Who the email comes from.'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  serverURL: envVars.SERVER_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    emailVerifyEmailTimer: envVars.JWT_VERIFY_EMAIL_TOKEN_TIMER,
    passwordResetTimer: envVars.JWT_RESET_PASSWORD_TOKEN_TIMER,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
