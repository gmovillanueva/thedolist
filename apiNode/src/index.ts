import { config as configDotenv } from 'dotenv';
import expressServer from '@/server';
import envVars from '@config/env.config';

configDotenv();

expressServer.listen(envVars.port, () => {
  const { port };
});
