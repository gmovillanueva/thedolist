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
    JWT_VERIFY_EMAIL_TOKEN_TIMER: Joi.number()
      .default(15)
      .description('Time (min) for verify email token to expire.'),
    JWT_RESET_PASSWORD_TOKEN_TIMER: Joi.number()
      .default(15)
      .description('Time (min) for reset password token to expire.'),
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
    emailVerifyEmailTimer: envVars.JWT_VERIFY_EMAIL_TOKEN_TIMER,
    passwordResetTimer: envVars.JWT_RESET_PASSWORD_TOKEN_TIMER,
  },
};
