import { basicAuth } from "./auth/basic-auth.middleware";
import { ErrorHandler  } from "./handlers.middleware";
import { validatePayments } from "./validations/payment-validations.middleware";

export default {
    basicAuth,
    ErrorHandler,
    validatePayments
};