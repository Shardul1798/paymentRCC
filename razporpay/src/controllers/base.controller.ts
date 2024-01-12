import { Response } from "express";

export default class BaseController {
  private includeLoginMessage: boolean = false;

  constructor() {}

  /** dispatches response from the server */
  async successResponse(
    r: Response,
    b: IApp.Dispatcher,
    d: IApp.DataKeys = {}
  ) {
    if (this.includeLoginMessage) {
      b.data = {
        //message: "Login successful",
        ...d,
      };
      this.includeLoginMessage = false;
    } else {
      b.data = d;
    }
    r.status(b.statusCode).json(b);
  }

  async failResponse(r: Response, b: IApp.Dispatcher, d: IApp.DataKeys = {}) {
    // b.data = d;
    r.status(b.statusCode).json(b);
  }

  setLoginSuccessMessageFlag(value: boolean) {
    this.includeLoginMessage = value;
  }
}

export const handleEntityResponse = new BaseController();