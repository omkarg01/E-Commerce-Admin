import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51JCOoESJtAOGSo1GEqFXSPkMgGjGQdpcX4qChLGRDJCxjlleutHhRQozza0O98KGoSLuRAKfVKs0YM1Ks04BORFH007wXVzZUQ');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

const paymentIntent = await stripe.paymentIntents.create({
  payment_method_types: ['card'],
  amount: 1099,
  currency: 'inr',
})

router.get('/checkout', async (req, res) => {
  const intent = paymentIntent;
  res.render('checkout', { client_secret: intent.client_secret });
});

export default router
