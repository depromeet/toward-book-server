import _ from 'lodash';
import dotenv from 'dotenv';

import development from './development';

dotenv.config();

const local = {
  server: {
    logging: {
      debug: true,
    },
    allowedOrigins: [],
    swagger: {
      ui: {
        swaggerOptions: {
          url: 'http://localhost:5000/swagger',
        },
      },
    },
    test: {
      agent: 'http://localhost:5000',
    },
  },
  db: {
    host: 'localhost',
    port: 3306,
    database: 'toward_book',
    username: process.env.MYSQL_LOCAL_USERNAME,
    password: process.env.MYSQL_LOCAL_PASSWORD,
    logging: console.log,
  },
};

export default _.merge(development, local);
