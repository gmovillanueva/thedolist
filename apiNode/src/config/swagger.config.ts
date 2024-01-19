import serverConfig from '@config/server.config';
import envConfig from '@config/env.config';
import {
  name,
  version as ver,
  repository,
  description as desc,
} from '@root/package.json';

const {
  api: { basePath, version },
} = serverConfig;

const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: `${name} API Documentation`,
    version: `${ver}`,
    description: `${desc}`,
    license: {
      name: 'MIT',
      url: repository,
    },
  },
  servers: [
    {
      url: `${envConfig.serverURL}:${envConfig.port}/${serverConfig.api.basePath}/${serverConfig.api.version}`,
      description: 'Express Server',
      variables: {
        port: {
          default: envConfig.port,
        },
        basePath: {
          default: basePath,
        },
        version: {
          default: version,
        },
        env: {
          default: envConfig.env,
        },
      },
    },
  ],
};

export default swaggerConfig;
