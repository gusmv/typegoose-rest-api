import mongoose from 'mongoose';

import config from '@config/database';

class Database {
  async connect() {
    mongoose.set('debug', config.mongodb.debug);

    await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default new Database();
