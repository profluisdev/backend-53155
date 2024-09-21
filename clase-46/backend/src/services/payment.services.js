import Stripe from "stripe";

const stripeService = new Stripe("sk_test_51Q1UqIP911ZNFn4U6Q2Df1IXobmRnp89bhzeP9JJxL5qIKXCCvWumhe3qRQzMBEpy7pWInVofRY44n7MymcW6bSg00HPjChlkQ");

const createPaymentIntent = async (data) => {
  const result = await stripeService.paymentIntents.create(data);
  console.log(result);
  return result;
};

export default {
  createPaymentIntent,
};
