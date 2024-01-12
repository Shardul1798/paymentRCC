import { Request, Response, NextFunction, Router } from "express";
import BaseRoute from "../../base/base.routes";
import middlewares from "../../../middlewares";
import { paymentController } from "../../../controllers/v1/payments/payments.controller";

class paymentRoutes extends BaseRoute {
  public path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  get instance(): Router {
    this.initRoutes();
    return this.router;
  }

  initRoutes() {
    this.router.post(
      "",
      middlewares.basicAuth.authentication,
      middlewares.validatePayments.validateCreateOrder,
      async (req: Request, res: Response, next: NextFunction) => {
        await paymentController.createOrder(req, res, next);
      }
    );

    this.router.post(
      "/verification",
      // middlewares.basicAuth.authentication,
      async (req: Request, res: Response, next: NextFunction) => {
        await paymentController.paymentVerification(req, res, next);
      }
    );

    this.router.get(
      "/get-key",
      middlewares.basicAuth.authentication,
      async (req: Request, res: Response, next: NextFunction) => {
        await paymentController.getRPKey(req, res, next);
      }
    );
  }
}

export default new paymentRoutes("/payment");
