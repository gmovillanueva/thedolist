import { str, num } from 'envalid';
import serverConfig from '@config/server.config';
import { Environments } from '@utils/environment.enums';

const envValidationConfig = {
  NODE_ENV: str({
    default: Environments.DEV,
    choices: [...Object.values(Environments)],
  }),
  PORT: num({ default: serverConfig.defaultPort }),
  DATABASE_URL: str(),
};

export default envValidationConfig;
