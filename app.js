import express from 'express';

import Cors from './middleware/cors';
import Morgan from './middleware/morgan';

import routers from './routes';
import CONFIG from './config';
import Sequelize from './models';
import { logger } from './config/winston';

Sequelize.sequelize
  .sync({
    force: false,
  })
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(Cors);
    app.use(Morgan);

    app.use('/', routers);

    const server = app.listen(CONFIG.server.port, () => {
      const { address, port } = server.address();
      logger.info(`Server is listening on ${address}:${port}.`);
    });

    process.on('SIGINT', () => {
      server.close(() => {
        const { pid } = process;
        logger.info(`Server process is closed. (PID: ${pid})`);
        process.exit(0);
      });
    });
  })
  .catch((e) => {
    logger.error('Failed to start server.\n', e);
  });
