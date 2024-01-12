import bodyParser from "body-parser";
import BaseRoute from "../base/base.routes";
import paymentRoutes from "./payments/payment.routes";
import { Router } from "express";

class ApiRoutes extends BaseRoute {
  public path = "/api/v1";
  constructor() {
    super();
    this.init();
  }
  get instance(): Router {
    return this.router;
  }
  private routeMiddlewares() {
    this.router.use("/", bodyParser.json(), (req, res, next) => {
      console.log("REQUEST URL:::::::", req.url);
    //   logger(
    //     `\n========================= NEW REQUEST ===> ${req.method} ${req.originalUrl}`
    //   );
    //   logger(req.body);
    //   logger(`\n=========================`);
      next();
    });
  }

  private init() {
    this.routeMiddlewares();
    this.router.use(paymentRoutes.path, paymentRoutes.instance);
   
  }
}

export default new ApiRoutes();