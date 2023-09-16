import Stripe from "stripe";
// eslint-disable-next-line no-undef
const stripe = Stripe(process.env.VITE_STRIPE_SECRET_KEY);
export default async (req, res) => {
  try {
    const amount = req.body.amount;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.statusCode = 200;

    res.send({
      message: {
        statusCode: 200,
        body: JSON.stringify({ paymentIntent }),
      },
    });
  } catch (error) {
    res.statusCode = 400;
    console.log({ error });
    res.send({
      message: {
        statusCode: 400,
        body: JSON.stringify({ error }),
      },
    });
  }
};
