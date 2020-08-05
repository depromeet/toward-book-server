import path from 'path';

const common = {
  server: {
    port: 5000,
    logging: {
      logDir: path.join(__dirname, '../../logs'),
    },
    language: 'ko',
  },
  db: {
    timezone: '+00:00',
    dialect: 'mysql',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
};

export default common;
