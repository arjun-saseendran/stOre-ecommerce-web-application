import { Router } from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";
import { userAuth } from "../../middlewares/userAuth.js";
import {
  getOrderDetails,
  getOrders,
  getOrdersByStatus,
  getSellerOrders,
  getSellerOrdersByStatus,
  getUserOrder,
  handleOrderStatus,
  updateStock,
  getOrderTotalPriceByCategory,
  getSellerOrderTotalPriceByCategory,
} from "../../controllers/orderControllers.js";

// Configure router
export const orderRouter = Router();

// Get all orders
orderRouter.get("/get-orders", adminAuth, getOrders);

// Get seller all orders
orderRouter.get("/get-seller-orders", sellerAuth, getSellerOrders);

// Get  orders by status
orderRouter.post("/get-orders-by-status", sellerAuth, getOrdersByStatus);

// Get seller orders by status
orderRouter.post(
  "/get-seller-orders-by-status",
  sellerAuth,
  getSellerOrdersByStatus
);

// Get  order details
orderRouter.get("/get-order-details/:orderId", sellerAuth, getOrderDetails);

// Change order status
orderRouter.post("/change-order-status", sellerAuth, handleOrderStatus);

// Get your order
orderRouter.get("/get-user-orders", userAuth, getUserOrder);

// Update stock
orderRouter.post("/update-stock", userAuth, updateStock);

// Get all order details by product category by total price
orderRouter.get(
  "/orders-total-price-by-category",
  adminAuth,
  getOrderTotalPriceByCategory
);

// Get seller order details by product category by total price
orderRouter.get(
  "/seller-orders-total-price-by-category",
  sellerAuth,
  getSellerOrderTotalPriceByCategory
);
