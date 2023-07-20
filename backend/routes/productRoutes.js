import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51JCOoESJtAOGSo1GEqFXSPkMgGjGQdpcX4qChLGRDJCxjlleutHhRQozza0O98KGoSLuRAKfVKs0YM1Ks04BORFH007wXVzZUQ');


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

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
