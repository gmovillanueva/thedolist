import fs from 'fs';
import path from 'path';
import { config as configDotenv } from 'dotenv';
import { cleanEnv } from 'envalid';
import { EnvironmentFile, Environments } from '@utils/environment.enums';
import { type CommonEnvKeys } from '@/types/environment.type';
import { envFileNotFoundError } from '@utils/helpers';
import envValidationConfig from '@config/env.config';
import serverConfig from '@config/server.config';

export interface IEnvironment {
  getCurrentEnvironment: () => string;
  setEnvironment: (env?: Environments) => void;
  isProd: () => boolean;
  isDev: () => boolean;
  isTest: () => boolean;
}

class Environment implements IEnvironment {
  private _port: number;
  private _env: Environments;

  constructor() {
    this._port = 0;
    this._env = <Environments>{};
    this.port = +process.env!.PORT ?? serverConfig.defaultPort;
    this.setEnvironment(process.env.NODE_ENV ?? Environments.DEV);
  }

  get env() {
    return this._env;
  }

  set env(value) {
    this._env = value;
  }

  get port() {
    return this._port;
  }

  set port(value) {
    this._port = value;
  }

  private resolveEnvPath(key: CommonEnvKeys): string {
    const rootDir: string = path.resolve(__dirname, '../../');
    const envPath = path.resolve(rootDir, EnvironmentFile[key]);
    const defaultEnvPath = path.resolve(rootDir, EnvironmentFile.DEFAULT);

    if (!fs.existsSync(envPath) && !fs.existsSync(defaultEnvPath)) {
      throw new Error(envFileNotFoundError(key));
    }
    return fs.existsSync(envPath) ? envPath : defaultEnvPath;
  }

  private validateEnvValues() {
    const env = cleanEnv(process.env, envValidationConfig);
    this.port = env.PORT;
  }

  public setEnvironment(env = Environments.DEV): void {
    this.env = env;

    const envKey = Object.keys(Environments).find(
      (key) => Environments[key] === this.env
    ) as keyof typeof Environments;
    const envPath = this.resolveEnvPath(envKey);

    configDotenv({ path: envPath });
    this.validateEnvValues();
  }

  public getCurrentEnvironment() {
    return this.env;
  }

  public isProd() {
    return this.env === Environments.PROD;
  }

  public isDev() {
    return this.env === Environments.DEV;
  }

  public isTest() {
    return this.env === Environments.TEST;
  }
}

export { Environment };
export default new Environment();
