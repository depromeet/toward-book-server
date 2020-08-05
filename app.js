import express from 'express';
import swaggerUi from 'swagger-ui-express';

import Cors from './middleware/cors';
import ErrorHandler from './middleware/error-handler';
import Morgan from './middleware/morgan';

import routers from './routes';
import CONFIG from './config';
import Sequelize from './models';
import swaggerSpecs from './docs';
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

    if (process.env.NODE_ENV !== 'production') {
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    }

    app.use(ErrorHandler);

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
