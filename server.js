const express = require('express');
const app = express();
require('dotenv').config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? require('stripe')(stripeSecretKey) : null;

app.use(express.static('.'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  if (!stripe) {
    res.status(503).send({ error: 'Billing is handled in Orbit Billing. STRIPE_SECRET_KEY is not configured for this legacy endpoint.' });
    return;
  }

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
app.listen(port, () => console.log(`Orbit website server running on port ${port}.`));
