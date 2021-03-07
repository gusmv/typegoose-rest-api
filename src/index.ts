import "dotenv/config";

import "./database";
import App from "./app";

import config from "@config/express";

const app = new App();

app.server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}.`);
});
