import { Request, Response, NextFunction } from "express";
import { appConfig } from "../../common/config.common";
import BaseController from "../../controllers/base.controller";
import { ErrorHandler } from "../handlers.middleware";
import base64 from 'base-64';

export class BasicAuth extends BaseController {
  constructor() {
    super();
  }

  async apiKeyAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const apikey = req.headers.apikey || "";
      if (!apikey || !(apikey !== appConfig.env.API_KEY)) {
        return ErrorHandler(
          {
            name: "ValidationError",
            joi: {
              details: [
                {
                  message: "Validation error message",
                  context: {
                    key: "API Key required!",
                  },
                },
              ],
            },
          },
          req,
          res,
          next
        );
      }
      return next();
    } catch (error) {
      throw error;
    }
  }

  async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const [email, password] = BasicAuth.decodeCredentials(
        req.headers.authorization || ""
      );
      if (
        email !== appConfig.env.AUTH_USER &&
        password !== appConfig.env.AUTH_PASSWORD
      ) {
        return ErrorHandler(
          {
            name: "ValidationError",
            joi: {
              details: [
                {
                  message: "Validation error message",
                  context: {
                    key: "Authentication required!",
                  },
                },
              ],
            },
          },
          req,
          res,
          next
        );
      }
      return next();
    } catch (error) {
      throw error;
    }
  }

  private static decodeCredentials(authHeader: string) {
    try {
      const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, "");

      const decodedCredentials = base64.decode(encodedCredentials);
      return decodedCredentials.split(":");
    } catch (error) {
      throw error;
    }
  }
}

export const basicAuth = new BasicAuth();
