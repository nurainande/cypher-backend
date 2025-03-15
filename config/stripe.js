// const Stripe = require('stripe')

const stripe = require('stripe')('sk_test_51Ozc4MP6msDdqKdeQxxM3pBxuzImDoUPUl5RYirQviCczfZcWuiCfT3qjxsw6AgHPoO0AoXmGsTl3nlKM1eCuovj00fRIqMc6V');

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// console.log('stripppp',stripe)

module.exports = stripe