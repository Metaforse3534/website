module.exports = function handler(_request, response) {
  response.status(410).json({
    error: 'Legacy payment intents are disabled. Continue in Orbit Billing.',
    billingUrl: 'https://app.orbitdev.org/billing',
  });
};
