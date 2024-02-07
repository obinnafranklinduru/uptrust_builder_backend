require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  APP_SECRET: process.env.APP_SECRET,
  DB_URL: process.env.MONGODB_URI,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  USER_SERVICE: process.env.USER_SERVICE,
};
