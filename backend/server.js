import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51JCOoESJtAOGSo1GEqFXSPkMgGjGQdpcX4qChLGRDJCxjlleutHhRQozza0O98KGoSLuRAKfVKs0YM1Ks04BORFH007wXVzZUQ');


dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.post('/payment-sheet', async (req, res) => {
  console.log(req.body);
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2020-08-27' }
  );

  // console.log(req.body.amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1536,
    // payment_method_types: ['card'],
    automatic_payment_methods: {
      enabled: true,
    },
    currency: 'inr',
    customer: customer.id,
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51JCOoESJtAOGSo1GjUJm9x0hW6UbSFo1Rhm1qH8QkXfm6egZZIG6hwzcaA6nwPLiUqK1uzSC0Z6zXbRIIk2L682O00p7Hz4FNn'
  });
});

const paymentIntent = await stripe.paymentIntents.create({
  payment_method_types: ['card'],
  amount: 1099,
  currency: 'inr',
})

app.post('/create-payment-intent', (req, res) => {
  const intent = paymentIntent;
  console.log(intent);
  res.send({clientSecret: intent.client_secret});
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)



const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
