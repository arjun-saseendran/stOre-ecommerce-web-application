import { Order } from "../models/orderModel.js";
import Stripe from "stripe";

// Config stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Handle checkout
export const createCheckoutSession = async (req, res, next) => {
  try {
    // Get products from request body
    const { products } = req.body;

    // Line items
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product?.productId?.title,
          images: [product?.productId?.image],
        },
        // Set product price
        unit_amount: Math.round(product?.productId?.price * 100),
      },
      // Set product quantity
      quantity: product?.quantity,
    }));

    // Calculate totalPrice
    const totalPrice =
      lineItems.reduce((total, item) => {
        return total + item.price_data.unit_amount * item.quantity;
      }, 0) / 100;

    // Create a new Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CORS}/user/payment-success`,
      cancel_url: `${process.env.CORS}/user/payment-cancel`,
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    // Save order details to the database
    const order = new Order({
      userId: req.user.id,
      sessionId: session.id,
      products: products.map((product) => ({
        productId: product.productId._id,
        quantity: product.quantity,
      })),
      totalPrice,
      orderStatus: "processing",
    });
    // Save order
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
    // Get user id from request user
    const userId = req.user.id;

    // Get order details
    const orderDetails = await Order.findOne({ userId });

    // Get order detailed details
    const sessionId = orderDetails.sessionId;

    // Get session data
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Send response to frontend
    res.json({
      status: session?.status,
      customer_email: session?.customer_details?.email,
      session_data: session,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Handle payment complete
export const handlePaymentComplete = async (req, res) => {
  try {
    // Get user id from request user
    const userId = req.user.id;

    // Find the most recent order for the user
    const order = await Order.findOne({ userId: userId }).sort({
      createdAt: -1,
    });

    // Handle case if no order is found
    if (!order) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Update payment status to 'completed'
    order.paymentStatus = "completed";

    // Save the order
    await order.save();

    // Send response to frontend
    return res
      .status(200)
      .json({ message: "Payment completed, order status updated" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};


// Handle payment incomplete
export const handlePaymentIncomplete = async (req, res) => {
  try {
    // Get user is from request user
    const userId = req.user.id;

    // Find the most recent order for the user
    const order = await Order.findOne({ userId: userId }).sort({
      createdAt: -1,
    });

    // Handle case if no order is found
    if (!order) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Check if the order payment status is incomplete
    if (order.paymentStatus !== "completed") {
      
      // Delete the order
      await Order.findByIdAndDelete(order._id);
      
      // Send response to frontend
      return res
        .status(200)
        .json({ message: "Incomplete order deleted successfully" });
    }

    // Handle payment already completed
    return res
      .status(400)
      .json({ message: "Order payment already completed, cannot delete" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
