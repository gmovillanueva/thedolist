import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const expressApp = express();
const httpServer = http.createServer(expressApp);
const serverPort = 4000;

import schema from './src/index.js';
import { expressMiddleware } from '@apollo/server/express4';

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

expressApp.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise((resolve) =>
  httpServer.listen(serverPort, () => {
    console.log(`Running a server at http://localhost:${serverPort}/graphql`);
  })
);

console.log(`Server ready at at http://localhost:${serverPort}/graphql`);

/*expressApp.listen(serverPort, () => {
  console.log(`Running a server at http://localhost:${serverPort}`);
});*/
