import { appConfig } from "./src/common/config.common";
import Application from "./src/app";

async function bootstrap() {
  try {
    console.log("============= Before Server Start =============");
    const server = Application.instance.listen(appConfig.env.PORT);
    server.on("listening", function () {
      console.log(
        `%c${"Welcome to Razorpay Payment Backend App"}`,
        `${"color: #e67e22; font-size: 24px;font-weight: bold;"}`
      );

      console.info(`Server started listening on port ${appConfig.env.PORT}`);
    });
  } catch (error) {
    throw error;
  }
}

bootstrap();
