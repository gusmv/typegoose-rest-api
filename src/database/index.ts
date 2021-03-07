import mongoose from "mongoose";

import config from "@config/mongo";

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
