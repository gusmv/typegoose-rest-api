import express, { Express, Request, Response } from "express";

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.routes();
  }

  routes() {
    this.server.get("/hello", (req: Request, res: Response) => {
      console.log(req.body);

      return res.json({
        message: "Hello World",
      });
    });
  }
}

export default App;
