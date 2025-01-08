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
  searchSellerOrders,
  requestReturn,
  handleReturn,
  getReturnRequests,
  getReturnDetails,
  getSellerReturnRequests,
  getSellerReturnDetails,
  searchReturnRequests,
  searchSellerReturnRequests,
  getOrdersByReturnStatus,
  getSellerOrdersByReturnStatus,
  searchOrdersByReturnStatus,
  searchSellerOrdersByReturnStatus,
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
orderRouter.get("/update-stock", userAuth, updateStock);

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
orderRouter.post("/search-orders", adminAuth, searchOrders);

// Search seller orders
orderRouter.post("/search-seller-orders", sellerAuth, searchSellerOrders);

// Return orders
orderRouter.post("/request-return/:orderId", userAuth, requestReturn);

// Handle return orders
orderRouter.post("/handle-return", sellerAuth, handleReturn);

// Get return request
orderRouter.post("/return-requests", adminAuth, getReturnRequests);

// Get seller return request
orderRouter.post(
  "/seller-return-requests",
  sellerAuth,
  getSellerReturnRequests
);

// Get return details
orderRouter.get("/return-details/:orderId", adminAuth, getReturnDetails);

// Get seller return details
orderRouter.get(
  "/return-details-seller/:orderId",
  sellerAuth,
  getSellerReturnDetails
);

// Search return requests
orderRouter.post("/search-return-requests", adminAuth, searchReturnRequests);

// Search return requests
orderRouter.post(
  "/search-seller-return-requests",
  sellerAuth,
  searchSellerReturnRequests
);

// Get return status
orderRouter.post("/get-return-status", adminAuth, getOrdersByReturnStatus);

// Get return status
orderRouter.post(
  "/get-return-status-seller",
  sellerAuth,
  getSellerOrdersByReturnStatus
);
// Search order by return status
orderRouter.post(
  "/search-order-by-return-status",
  adminAuth,
  searchOrdersByReturnStatus
);
// Search seller order by return status
orderRouter.post(
  "/search-seller-order-by-return-status",
  sellerAuth,
  searchSellerOrdersByReturnStatus
);

