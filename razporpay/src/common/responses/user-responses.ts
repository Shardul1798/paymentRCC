export const MSG: any = {
  UNAUTHORIZED: "You're not allowed to perform this action!",
  NOT_FOUND: "Not found",
  TOKEN_NOT_PROVIDED: "Token Not Provided",
  DATA_NOT_FOUND: "Entered data is not found",
  INTERNAL_SERVER: "Internal Server Error",
  SOMETHING_WENT_WRONG: "Something Went Wrong! Please try after some time",
};

export const RESPONSEMSG: any = {
  NOT_FOUND: {
    ///httpCode: HTTP.NOT_FOUND,
    statusCode: 404,
    message: MSG.NOT_FOUND,
  },
  TOKEN_NOT_PROVIDED: {
    //httpCode: HTTP.TOKEN_MISSING,
    statusCode: 401,
    message: MSG.TOKEN_NOT_PROVIDED,
  },
  SOMETHING_WENT_WRONG: {
    statusCode: 409,
    message: MSG.SOMETHING_WENT_WRONG,
  },
  CONTENT_NOT_FOUND: {
    statusCode: 404,
    message: MSG.CONTENT_NOT_FOUND,
  },
  INVALID_TOKEN: {
    statusCode: 498,
    message: MSG.INVALID_TOKEN,
  },
  UNAUTHORIZED: {
    statusCode: 401,
    Message: MSG.UNAUTHORIZED,
  },
};
