import { Order } from "../models/orderModel.js";
import {Product} from '../models/productModel.js'
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
    res.status(200).json({
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
    const ordersDetails = await Order.findById(orderId).populate(
      "products.productId",
      "title image price"
    );

    if (!ordersDetails) {
      return res.status(404).json({ message: "No order details found!" });
    }

    // Send data to frontend
    res.status(200).json({
      message: "Order details fetched successfully!",
      data: ordersDetails,
    });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get orders base seller
export const getSellerOrdersByStatus = async (req, res) => {
  try {
    // Get seller id
    const userId = req.user.id;

    // Get status
    const { status } = req.body;

    // Validate sellerId
    if (!userId) {
      return res.status(400).json({ error: "Seller not found" });
    }

    // Find all products associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle no product found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    const productIds = sellerProducts.map((product) => product._id);

    // Find all orders containing products associated with this seller
    let orders = await Order.find({
      "products.productId": { $in: productIds },
    }).populate("products.productId", "title price image");

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller" });
    }

    // Filter the orders by status
    if (status) {
      orders = orders.filter((order) => order.orderStatus === status);
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Change order status
export const handleOrderStatus = async(req,res) => {
  
}
