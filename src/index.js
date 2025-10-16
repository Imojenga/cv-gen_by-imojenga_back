import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cvsRouter from './routers/cvs.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = parseInt(getEnvVar('PORT', '3000'));

const setUpServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cvsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setUpServer();
