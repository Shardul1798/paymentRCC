import * as dotenv from "dotenv";

export const APP_CONSTANTS = {
  ENV: "NODE_ENV",
  DEV: "dev",
  QA: "qa",
  LOCAL: "local",
};

export let appConfig = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    RAZORPAY_KEY_ID: process.env.DEV_RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.DEV_RAZORPAY_KEY_SECRET,
    API_KEY: process.env.DEV_API_KEY,
    AUTH_USER: process.env.DEV_USER,
    AUTH_PASSWORD: process.env.DEV_PASSWORD,
  },
};

switch (process.env.NODE_ENV) {
  case APP_CONSTANTS.DEV:
    dotenv.config({ path: ".env.dev" });
    appConfig = {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        RAZORPAY_KEY_ID: process.env.DEV_RAZORPAY_KEY_ID,
        RAZORPAY_KEY_SECRET: process.env.DEV_RAZORPAY_KEY_SECRET,
        API_KEY: process.env.DEV_API_KEY,
        AUTH_USER: process.env.DEV_USER,
        AUTH_PASSWORD: process.env.DEV_PASSWORD,
      },
    };
    console.log("APP Config =====>", appConfig);

    break;
  case APP_CONSTANTS.LOCAL:
    dotenv.config({ path: ".env.local" });
    appConfig = {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        RAZORPAY_KEY_ID: process.env.DEV_RAZORPAY_KEY_ID,
        RAZORPAY_KEY_SECRET: process.env.DEV_RAZORPAY_KEY_SECRET,
        API_KEY: process.env.DEV_API_KEY,
        AUTH_USER: process.env.DEV_USER,
        AUTH_PASSWORD: process.env.DEV_PASSWORD,
      },
    };
    console.log("Local App Config =====>", appConfig);
    break;
  case APP_CONSTANTS.QA:
    dotenv.config({ path: ".env.qa" });
    appConfig = {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        RAZORPAY_KEY_ID: process.env.STAG_RAZORPAY_KEY_ID,
        RAZORPAY_KEY_SECRET: process.env.STAG_RAZORPAY_KEY_SECRET,
        API_KEY: process.env.STAG_API_KEY,
        AUTH_USER: process.env.QA_USER,
        AUTH_PASSWORD: process.env.QA_PASSWORD,
      },
    };
    break;
  default:
    dotenv.config({ path: ".env.dev" });
    break;
}
