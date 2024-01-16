import { str, num } from 'envalid';
import serverConfig from '@config/server.config';
import { Envionments } from '@/enums/environment.enums';

const envValidationConfig = {
  NODE_ENV: str({
    default: Envionments.DEV,
    choices: [...Object.values(Envionments)],
  }),
  PORT: num({ default: serverConfig.defaultPort }),
  DATABASE_URL: str(),
};

export default envValidationConfig;
