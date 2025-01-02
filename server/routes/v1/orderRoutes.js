import { Router } from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";
import { userAuth } from "../../middlewares/userAuth.js";
import {
  getOrderDetails,
  getOrders,
  getOrdersByStatus,
  getSellerOrdersByStatus,
} from "../../controllers/orderControllers.js";

// Configure router
export const orderRouter = Router();

// Get all orders
orderRouter.get("/get-orders", adminAuth, getOrders);

// Get  orders by status
orderRouter.post("/get-orders-by-status", sellerAuth, getOrdersByStatus);

// Get seller orders by status
orderRouter.post("/get-seller-orders-by-status", sellerAuth, getSellerOrdersByStatus);

// Get  order details
orderRouter.get("/get-order-details/:orderId", sellerAuth, getOrderDetails);
