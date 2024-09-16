import dotenv from "dotenv";

const environment = "DEV"
dotenv.config({
  path: environment === "PRODUCTION" ? "./.env.prod" : "./.env.dev"
});


export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  CODE_SECRET: process.env.CODE_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GMAIL_PASS: process.env.GMAIL_PASS,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SMS_NUMBER: process.env.TWILIO_SMS_NUMBER
}