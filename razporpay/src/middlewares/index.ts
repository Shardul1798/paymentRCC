import { basicAuth } from "./auth/basic-auth.middleware";
import { validatePayments } from "./validations/payment-validations.middleware";

export default {
    basicAuth,
    validatePayments
};