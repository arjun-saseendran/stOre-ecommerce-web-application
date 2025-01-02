import { Order } from "../models/orderModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    // Find all data
    const orders = await Order.find();

    if (!orders) {
      return res.status(404).json({ message: "No orders found!" });
    }

    // Send data to frontend
    res
      .status(200)
      .json({ message: "Orders fetched successfully!", data: orders });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get processing orders
export const getProcessingOrders = async (req, res) => {
  try {
    // Find all data
    const processingOrders = await Order.find({ status: "processing" });

    if (!processingOrders) {
      return res.status(404).json({ message: "No processing orders found!" });
    }

    // Send data to frontend
    res
      .status(200)
      .json({
        message: "Processing orders fetched successfully!",
        data: processingOrders,
      });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get success orders
export const getSuccessOrders = async (req, res) => {
  try {
    // Find all data
    const successOrders = await Order.find({ status: "success" });

    if (!successOrders) {
      return res.status(404).json({ message: "No success orders found!" });
    }

    // Send data to frontend
    res
      .status(200)
      .json({
        message: "Success orders fetched successfully!",
        data: successOrders,
      });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get shipping orders
export const getShippingOrders = async (req, res) => {
  try {
    // Find all data
    const shippingOrders = await Order.find({ status: "shipping" });

    if (!shippingOrders) {
      return res.status(404).json({ message: "No shipping orders found!" });
    }

    // Send data to frontend
    res
      .status(200)
      .json({
        message: "Success orders fetched successfully!",
        data: shippingOrders,
      });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Filter orders by status
export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Find all data
    const ordersByStatus = await Order.find({ orderStatus: status }).populate(
      "products.productId",
      "title"
    );

    if (!ordersByStatus) {
      return res.status(404).json({ message: "No orders found!" });
    }

    // Send data to frontend
    res
      .status(200)
      .json({
        message: "Orders by status fetched successfully!",
        data: ordersByStatus,
      });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};
// Get order details
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Get order details
    const ordersDetails = await Order.findById({orderId }).populate(
      "products.productId",
      "title"
    );

    if (!ordersDetails) {
      return res.status(404).json({ message: "No order details found!" });
    }

    // Send data to frontend
    res
      .status(200)
      .json({
        message: "Order details fetched successfully!",
        data: ordersDetails,
      });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};
