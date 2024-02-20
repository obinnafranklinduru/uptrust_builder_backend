import dotenv from "dotenv";

dotenv.config();

interface AppConfig {
  PORT: string;
  DB_URL: string;
  APP_SECRET: string;
  //   EXCHANGE_NAME: string;
  //   MSG_QUEUE_URL: string;
  //   CUSTOMER_SERVICE: string;
  //   SHOPPING_SERVICE: string;
}

export const config: AppConfig = {
  PORT: process.env.PORT!,
  DB_URL: process.env.MONGODB_URI!,
  APP_SECRET: process.env.APP_SECRET!,
  //   EXCHANGE_NAME: process.env.EXCHANGE_NAME!,
  //   MSG_QUEUE_URL: process.env.MSG_QUEUE_URL!,
  //   CUSTOMER_SERVICE: process.env.CUSTOMER_SERVICE!,
  //   SHOPPING_SERVICE: process.env.SHOPPING_SERVICE!,
};
