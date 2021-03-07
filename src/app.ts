import express, { Express } from 'express';

import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  async routes(): Promise<void> {
    this.server.use(routes);
  }
}

export default App;
