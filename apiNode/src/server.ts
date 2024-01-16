/*
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

/!*import { resolver } from './resolvers';
import { typeDefs } from './types';*!/

import { expressApp } from '../app.ts';
import { LOGGER, PORT, WHITELIST } from '@/config/server.config.ts';
import exp from 'node:constants';
import winstonLogger from '@/middleware/loggerWinston.ts';

interface ServerContext {
  token?: string;
}

const httpServer = http.createServer(expressApp);

const server = new ApolloServer<ServerContext>({
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

expressApp.use(cors());

await server.start();

expressApp.use();
*/
