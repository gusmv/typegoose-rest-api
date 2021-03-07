import mongoose from "mongoose";

import config from "@config/mongo";

mongoose.set("debug", config.debug);

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
