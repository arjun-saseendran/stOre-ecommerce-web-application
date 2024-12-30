import { Order } from "../models/orderModel.js";
import Stripe from "stripe";

// Config stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Handle checkout
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product?.productId?.title,
          images: [product?.productId?.image],
        },
        unit_amount: Math.round(product?.productId?.price * 100),
      },
      quantity: 1,
    }));

    // Create a new Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CORS}/user/payment-success`,
      cancel_url: `${process.env.CORS}/user/payment-cancel`,
    });

    // Save order details to the database
    const order = new Order({
      userId: req.user.id,
      sessionId: session.id,
    });
    await order.save();

    // Send response to the client
    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    next(error);
  }
};

// Get session status
export const getSessionStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const orderDetails = await Order.findOne({ userId });

    const sessionId = orderDetails.sessionId;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session?.status,
      customer_email: session?.customer_details?.email,
      session_data: session
    });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};
