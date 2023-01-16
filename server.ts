require('dotenv').config();

import express from 'express';
import { sequelize } from './src/lib/db';
import bodyParser from 'body-parser';
import { routes } from './src/routes/index';

export const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

async () => {
  await sequelize.sync({ force: true });
};

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}
