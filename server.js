require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY'); // Insert your stripe secret test key here

app.use(express.static('.'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    // €29.00 mapped out in standard currency cents (2900)
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

app.listen(4242, () => console.log('Matrix gateway running on port 4242!'));