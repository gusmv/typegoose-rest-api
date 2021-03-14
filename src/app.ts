import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { errors } from 'celebrate';
import AppException from '@errors/AppException';

import routes from './routes';
import '@jobs/index';

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
    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppException) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default App;
