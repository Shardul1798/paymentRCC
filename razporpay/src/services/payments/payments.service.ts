import Razorpay from "razorpay";
import { appConfig } from "../../common/config.common";
import * as crypto from "crypto";
import { ApplicationError } from "../../common/responses/application-error";
import { RESPONSEMSG } from "../../common/responses/user-responses";
import Cryptr from "cryptr";

// Create a Razorpay instance with API credentials from the appConfig
export const RazorpayInstance = new Razorpay({
  key_id: appConfig.env.RAZORPAY_KEY_ID,
  key_secret: appConfig.env.RAZORPAY_KEY_SECRET,
});

// PaymentService class for handling payment-related operations
export class PaymentService {
  private _rpInstance: Razorpay;
  private cryptr = new Cryptr(appConfig.env.SECRET_CRYPTR, {
    encoding: "base64",
    pbkdf2Iterations: 10000,
    saltLength: Number(appConfig.env.SALT),
  });

  constructor() {
    this._rpInstance = RazorpayInstance;
  }

  // Method to create a payment order
  async createPaymentOrder(body) {
    try {
      const { amount, currency } = body;
      const originalAmount = this.cryptr.decrypt(amount); // Decrypt the encrypted amount using Cryptr
      if (amount && currency) {
        const options = {
          amount: originalAmount,
          currency: currency,
        };
        return await this._rpInstance.orders.create(options);
      }
    } catch (error) {
      // Throw an application error in case of any issues
      throw new ApplicationError(
        "Bad Request Error",
        RESPONSEMSG.SOMETHING_WENT_WRONG
      );
    }
  }

  // Method to fetch the Razorpay key
  async fetchKey() {
    try {
      return await appConfig.env.RAZORPAY_KEY_ID;
    } catch (error) {
      throw new ApplicationError(
        "Bad Request Error",
        RESPONSEMSG.SOMETHING_WENT_WRONG
      );
    }
  }

  // Method to validate the signature received from Razorpay
  async validateSignature(body: any) {
    const { order_id, payment_id, signature } = body;
    try {
      const body = order_id + "|" + payment_id;

      // Generate the expected signature using the Razorpay key secret
      const expectedSignature = crypto
        .createHmac("sha256", appConfig.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      // Compare the expected signature with the received signature
      const isAuthentic = expectedSignature === signature;

      //Your code to save the data into the database goes here...
      return isAuthentic;
    } catch (error) {
      throw new ApplicationError(
        "Bad Request Error",
        RESPONSEMSG.SOMETHING_WENT_WRONG
      );
    }
  }
}

// Create a single instance of the PaymentService for use throughout the application
export const _paymentService = new PaymentService();
