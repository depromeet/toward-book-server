import dotenv from 'dotenv';

dotenv.config();

const development = {
  server: {
    logging: {
      debug: false,
    },
    allowedOrigins: [],
    test: {
      agent: '',
    },
  },
  db: {
    host: '',
    port: 3306,
    database: '',
    username: process.env.MYSQL_DEV_USERNAME,
    password: process.env.MYSQL_DEV_PASSWORD,
    logging: false,
  },
  auth: {
    jwt: {
      accessToken: {
        algorithm: 'HS256',
        secret: 'developmentSecret',
        ttl: '30d',
      },
    },
  },
};

export default development;
