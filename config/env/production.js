import dotenv from 'dotenv';

dotenv.config();

const production = {
  server: {
    logging: {
      debug: false,
    },
    allowedOrigins: [],
  },
  db: {
    host: '',
    port: 3306,
    database: '',
    username: process.env.MYSQL_PROD_USERNAME,
    password: process.env.MYSQL_PROD_PASSWORD,
    logging: false,
  },
  auth: {
    jwt: {
      accessToken: {
        algorithm: process.env.JWT_ACCESS_ALGORITHM,
        secret: process.env.JWT_ACCESS_SECRET,
        ttl: process.env.JWT_ACCESS_TTL,
      },
    },
  },
};

export default production;
