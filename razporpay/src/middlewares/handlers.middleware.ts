import { Response, Request, NextFunction } from "express";

export const ErrorHandler = function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`Error handler error ==>`, err.name || err.joi.name, err);
  switch (err.name || err.joi.name) {
    case "ValidationError":
      let messagetosend = err.joi.details[0].message.replace(/"/g, "");
      messagetosend = messagetosend[0].toUpperCase() + messagetosend.slice(1);
      return res.status(401).send({
        success: false,
        statusCode: 401,
        key: err.joi.details[0].context.key,
        message: messagetosend,
      });
    case "BadRequestError":
      console.log(`BadRequestError case ==>`, err);
      return res.status(err.status).json({
        success: false,
        statusCode: 401,
        message: err.message,
      });
    case "TokenExpiredError":
      console.log(`token expired errorrr ==>`, err);
      return res.status(498).json({
        success:false,
        message: "Your session has been expired",
        statusCode: 498,
      });
    case "JsonWebTokenError":
      console.log(`JsonWebTokenError case error ==>`, err);
      return res.status(498).json({ 
        success:false,
        message: "expired token",
        statusCode:498
      });
    case "Error":
      return res.status(400).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode,
      });
    case "MongoServerError":
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Duplicate key error",
          statusCode: 409,
        });
      }
    case "InvalidDataError":
      return res.status(404).json({
        success: false,
        message: "entered data is invalid",
        statusCode: 404,
      });
    case "CastError":
    return res.status(400).json({
      success:false,
      message:"Invalid Data entered",
      statusCode:400
    })

    default:
      return res.status(err.status ? err.status : 500).json({
        success: false,
        statusCode: err.status ? err.status : 500,
        message: err.message ? err.message : "Internal Server ",
      });
  }
};

/** handles invalid route message */
export const InvalidRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("invalid route", req.url);
  res.status(404).json({
    success: false,
    message: "Invalid route",
    statusCode: 404,
  });
};
