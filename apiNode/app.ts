import express from 'express';
import notDefined from './src/middleware/notdefined';
// import dotenv from 'dotenv';

export const expressApp = express();

// Init Middleware
expressApp.use(notDefined);

// Init Routes
expressApp.get('/', (_request, response) => response.send('Hello!'));
