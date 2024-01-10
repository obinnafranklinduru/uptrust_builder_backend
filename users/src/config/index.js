require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  APP_SECRET: process.env.APP_SECRET,
  DB_URL: process.env.MONGODB_URI,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  USER_SERVICE: process.env.USER_SERVICE,
  KINDE_DOMAIN: process.env.KINDE_DOMAIN,
  KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
  KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
  KINDE_REDIRECT_URI: process.env.KINDE_REDIRECT_URI,
  KINDE_LOGOUT_REDIRECT_URI: process.env.KINDE_LOGOUT_REDIRECT_URI,
};