import 'dotenv/config';
import 'reflect-metadata';

import App from './app';
import Database from './database';

import config from '@config/app';

const app = new App();

Database.connect().then(() => {
  console.log('Database connection stabilized.');
  app.server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}.`);
  });
});
