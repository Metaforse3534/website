const express = require('express');
const app = express();
require('dotenv').config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is required to create payment intents.');
}

const stripe = require('stripe')(stripeSecretKey);

app.use(express.static('.'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    // EUR 29.00 mapped out in standard currency cents (2900)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2900,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: { integration_check: 'orbit_pulsar_sub' },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Matrix gateway running on port ${port}!`));
