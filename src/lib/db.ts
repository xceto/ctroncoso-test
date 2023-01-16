import { Sequelize } from 'sequelize-typescript';
import Models from '../entities';

const databaseParams = require('../config/database');
const env = process.env.NODE_ENV || 'development';
const databaseOptions = databaseParams[env];
const { database, username, password, dialect, host } = databaseOptions;

const sequelize = new Sequelize({
  database,
  username,
  password,
  dialect,
  host,
  models: Models,
});

sequelize.authenticate().then(function (errors) {
  console.log('errors >', errors);
});

export { sequelize };
