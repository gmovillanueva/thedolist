import { type Environments } from '@utils/environment.enums';

export type CommonEnvKeys = keyof typeof Environments;
export type EnvFileKeys = CommonEnvKeys | 'DEFAULT';
