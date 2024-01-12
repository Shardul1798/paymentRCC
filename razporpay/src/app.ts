import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import ApiRoutes from './routes/v1/index';

class Application {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.initApp();
  }

  get instance(): express.Application {
    return this.app;
  }

  async initApp() {
    try {
      console.log("inside init")
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(bodyParser.json());
      this.app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, PATCH"
        );
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        next();
      });
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.useRoutes();
    } catch (error) {
      console.error(`we have an error initializing server ==> ${error}`);
    }
  }

  useRoutes() {
    this.app.use(ApiRoutes.path, ApiRoutes.instance);
  }
}


export default new Application();