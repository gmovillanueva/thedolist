import chalk from 'chalk';
import { EnvironmentFile } from '@utils/environment.enums';
import { type CommonEnvKeys } from '@/types/environment.type';

const envScriptChalk = (filename: string) => {
  const scriptChalk = chalk.bgBlueBright.bold;
  return `${scriptChalk(`cp .env.example ${filename}`)}`;
};

export const envFileNotFoundError = (key: CommonEnvKeys): string => {
  const divider = chalk.red('~'.repeat(40));
  const envFile = EnvironmentFile[key];
  const defaultEnvFile = EnvironmentFile.DEFAULT;
  const envNotFoundMessage = chalk.red.bold('Environment file not found!');
  const fileNotFoundMessage = `${chalk.greenBright(
    defaultEnvFile
  )} or ${chalk.greenBright(envFile)} is required.`;

  return `
  \r${divider}\n
  \r${envNotFoundMessage}\n
  \r${divider}\n
  \r${fileNotFoundMessage}\n
  \r${chalk.bold('Try:')}\n
  \r${envScriptChalk(envFile)}\n
  \r${envScriptChalk(defaultEnvFile)}\n
  \r${divider}`;
};
