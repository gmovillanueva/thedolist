import { type Environments } from '@/enums/environment.enum';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: Environments;
      PORT: string;
      DATABASE_URL: string;
    }
  }
}

export {};
