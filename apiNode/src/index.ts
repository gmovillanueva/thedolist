import { config as configDotenv } from 'dotenv';
import expressServer from '@/server';
import envVars from '@config/env.config';
import { printInfo } from '@utils/helpers';
import prismaClient from '@lib/prisma';

configDotenv();

expressServer.listen(envVars.port, () => {
  printInfo();
  /*expressServer._router.stack.forEach(function (r: {
    router: any;
    route: { path: any };
  }) {
    if (r.router && r.route.path) {
      console.log(r.route.path);
    }
  });*/
});

process.on('SIGINT', () => {
  prismaClient.$disconnect();
  console.log('Prisma Disconnected.');
  process.exit(0);
});
