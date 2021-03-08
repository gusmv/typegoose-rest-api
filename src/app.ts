import express, { Express } from 'express';

import { errors } from 'celebrate';

import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.server.use(express.json());

    this.routes();
    this.middlewares();
  }

  private middlewares(): void {
    this.server.use(errors());
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default App;
