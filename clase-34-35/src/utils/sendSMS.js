import twilio from "twilio";
import envs from "../config/env.config.js"

const { TWILIO_ACCOUNT_SID, TWILIO_SMS_NUMBER, TWILIO_AUTH_TOKEN } = envs;

export const sendSMS = async (phone, message) => {
    try {

      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      await client.messages.create({
        body: message,
        from: TWILIO_SMS_NUMBER,
        to: phone
      })
      
    } catch (error) {
      console.log(error);
    }
}