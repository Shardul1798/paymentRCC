import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createOrderSchema = Joi.object().keys({
  amount: Joi.number().required(),
  currency: Joi.string().required().valid("INR", "USD"),
});

export class PaymentValidation {
  async validateCreateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = createOrderSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const validatePayments = new PaymentValidation();