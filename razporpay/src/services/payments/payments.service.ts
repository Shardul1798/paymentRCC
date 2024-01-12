import Razorpay from "razorpay";
import { appConfig } from "../../common/config.common";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import * as crypto from "crypto";

export const RazorpayInstance = new Razorpay({
  key_id: appConfig.env.RAZORPAY_KEY_ID,
  key_secret: appConfig.env.RAZORPAY_KEY_SECRET,
});

export class PaymentService {
  private _rpInstance: Razorpay;
  constructor() {
    this._rpInstance = RazorpayInstance;
  }
  async createPaymentOrder(body) {
    try {
      const { amount, currency } = body;
      if (amount && currency) {
        const options = {
          amount: amount,
          currency: currency,
        };
        return await this._rpInstance.orders.create(options);
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchKey() {
    try {
      return await appConfig.env.RAZORPAY_KEY_ID;
    } catch (error) {
      throw error;
    }
  }

  async validateSignature(body: any) {
    const { order_id, payment_id, signature } = body;
    try {
      const body = order_id + "|" + payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", appConfig.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

        console.log('match ================> ',expectedSignature, signature);
        
      const isAuthentic = expectedSignature === signature;
      console.log("is authentic",isAuthentic);
      //save in database
      return isAuthentic;
    } catch (error) {
      throw error;
    }
  }
}

export const _paymentService = new PaymentService();
