import { Request, Response, NextFunction, Router } from "express";
import BaseRoute from "../../base/base.routes";
import middlewares from "../../../middlewares";
import { paymentController } from "../../../controllers/v1/payments/payments.controller";

// Class for handling payment-related routes, extending the BaseRoute class
class paymentRoutes extends BaseRoute {
  public path: string;    // Define the path for the payment routes

  constructor(path: string) {
    super();
    this.path = path;
  }

  // Getter method for obtaining the instance of the Router with initialized routes
  get instance(): Router {
    this.initRoutes();
    return this.router;
  }

  // Method to initialize payment-related routes
  initRoutes() {
    // Route for creating a payment order
    this.router.post(
      "",
      middlewares.basicAuth.authentication,
      middlewares.validatePayments.validateCreateOrder,
      async (req: Request, res: Response, next: NextFunction) => {
        await paymentController.createOrder(req, res, next);
      }
    );

    // Route for handling payment verification
    this.router.post(
      "/verification",
      // middlewares.basicAuth.authentication,
      async (req: Request, res: Response, next: NextFunction) => {
        await paymentController.paymentVerification(req, res, next);
      }
    );

    // Route for obtaining the Razorpay key id
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
