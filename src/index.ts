import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, json, urlencoded } from 'express';
import { Server } from 'http';

import config from './config/config';
import logger from './config/logger';
import { errorHandler, successHandler } from './config/morgan';
import { errorMiddleware } from './middlewares/error.middleware';
import router from './routes/v1';
import prisma from './prismaClient';

const app: Express = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

dotenv.config();

const port = process.env.PORT || 8080;

app.use(urlencoded({ extended: true }));

app.use(cors());

app.options('*', cors());

app.use(json());

//all routes are prefixed with /v1
app.use('/api/v1', router);

app.use(errorMiddleware);

let server: Server;

//connect to the database and start the server
void prisma.$connect().then(() => {
  console.info('Connected to SQL Database');
  app.listen(port, () => {
    console.info(`Listening to port http://localhost:${port}/api/v1`);
  });
});

//exception handling
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');

  if (server) {
    server.close();
  }
});
