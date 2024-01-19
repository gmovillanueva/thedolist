import chalk from 'chalk';

import serverConfig from '@config/server.config';
import envConfig from '@config/env.config';
import envVars from '@config/env.config';
import { logWithoutConsole } from '@lib/loggerWinston';
import expressListRoutes from 'express-list-routes';
import mainRouter from '@/routes';

const primaryChalk = chalk.green;

const label = (text: string): string => {
  const labelChalk = chalk.white.bold;
  const icon = primaryChalk('✔');
  return `${icon} ${labelChalk(text)}`;
};

const {
  docs: { swaggerUIPath, apiDocsPath },
} = serverConfig;

const appURL = `${envVars.serverURL}:${envVars.port}`;

export const printInfo = () => {
  const divider = chalk.blue('~'.repeat(55));
  /*const urlChalk = chalk.underline.blue;*/
  const serverSuccessMessage = primaryChalk.bold(
    'Server successfully started.'
  );
  const serverConfigInformation = primaryChalk.bold(
    'Server Config Information.'
  );
  const serverRouteInformation = primaryChalk.bold(
    'Routes registered on server:'
  );

  /*  const routesArray = expressListRoutes(mainRouter);*/

  console.log(`
    \r${divider}\n
    \r${serverSuccessMessage}\n
    \r${divider}\n
    \r${serverConfigInformation}\n
    \r${label('Port')}: ${envConfig.port}
    \r${label('ENV')}: ${envConfig.env}
    \r${label('App URL')}: http://${appURL}
    \r${label('Api URL')}: http://${appURL}
    \r${label('Swagger')}: http://${`${appURL}${swaggerUIPath}`}
    \r${label('API Specs')}: http://${`${appURL}${apiDocsPath}\n`}
    \r${divider}\n
    \r${serverRouteInformation}
  `);

  expressListRoutes(mainRouter);

  console.log(`\n${divider}\n`);

  if (envVars.env !== 'development') {
    logWithoutConsole({
      level: 'info',
      message: `Server started at ${appURL}`,
    });
  }
};
