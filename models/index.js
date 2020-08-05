import fs from 'fs';
import path from 'path';

import Sequelize from 'sequelize';

import SEQUELIZE from '../config/sequelize';

const db = {};
const basename = path.basename(__filename);
const sequelize = new Sequelize(
  SEQUELIZE.database,
  SEQUELIZE.username,
  SEQUELIZE.password,
  SEQUELIZE
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
