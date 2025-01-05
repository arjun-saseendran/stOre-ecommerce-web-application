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
  searchOrders,
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

// Get total price by product category from all orders
orderRouter.get(
  "/orders-total-price-by-category",
  adminAuth,
  getOrderTotalPriceByCategory
);

// Get total price by product category by seller orders
orderRouter.get(
  "/seller-orders-total-price-by-category",
  sellerAuth,
  getSellerOrderTotalPriceByCategory
);

// Search orders
orderRouter.post("/search-orders", sellerAuth, searchOrders);
