import { Request, Response, NextFunction } from "express";
import { _paymentService } from "../../../services/payments/payments.service";
import BaseController from "../../base.controller";

export class PaymentController extends BaseController {
  constructor() {
    super();
  }

  // Handles the creation of a payment order
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await _paymentService.createPaymentOrder(req.body);
      return result
        ? this.successResponse(res, { statusCode: 200, message: "OK" }, result)
        : this.failResponse(res, { statusCode: 504, message: "Bad Request!" });
    } catch (error) {
      next(error);
    }
  }

  // Retrieves a Razorpay key, for payment integration at Frontend.
  async getRPKey(req: Request, res: Response, next: NextFunction) {
    try {
      const key = await _paymentService.fetchKey();
      return key
        ? this.successResponse(
            res,
            { statusCode: 200, message: "OK" },
            { key: key }
          )
        : this.failResponse(res, { statusCode: 504, message: "Bad Request!" });
    } catch (error) {
      next(error);
    }
  }

  // Handles payment verification and redirects to payment success page
  async paymentVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const resp:any = await _paymentService.validateSignature(req.body);
      if(resp) {
        res.redirect(`http://localhost:4200/feature/paymentSuccess?ref_id=${req.body.payment_id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}


export const paymentController = new PaymentController();   //Creates a single instance of the controller for use throughout the application.
