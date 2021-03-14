import mongoose from 'mongoose';

import config from '@config/database';

mongoose.set('debug', config.mongodb.debug);

mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
