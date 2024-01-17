import path from 'path';
import serverConfig from '@config/server.config';
import envConfig from '@/schema/env.schema';

const {
  api: { basePath, version },
  docs: { swaggerUIPath, apiDocsPath },
} = serverConfig;

const baseDir = path.join(__dirname, '../../');

const swaggerConfig = {
  info: {
    version: '1.0.0',
    title: 'Rest Api',
    description: 'Api specs for',
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: `${envConfig.port}/{basePath}/{version}/{env}`,
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
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  baseDir,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: `${baseDir}/src/**/*.route.ts`,
  // URL where SwaggerUI will be rendered
  swaggerUIPath,
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: true,
  // Open API JSON Docs endpoint.
  apiDocsPath,
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

export default swaggerConfig;
