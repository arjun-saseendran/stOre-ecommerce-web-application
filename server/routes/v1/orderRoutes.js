import { Router } from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";
import { userAuth} from '../../middlewares/userAuth.js'
import { getOrders, getOrdersByStatus, getProcessingOrders, getSuccessOrders } from "../../controllers/orderControllers.js";

// Configure router
export const orderRouter = Router();


// Get all orders
orderRouter.get("/get-orders", adminAuth, getOrders);

// Get all processing orders
orderRouter.get("/processing", sellerAuth, getProcessingOrders);

// Get all success orders
orderRouter.get("/success", sellerAuth, getSuccessOrders);

// Get  orders by status
orderRouter.post("/get-orders-by-status", sellerAuth, getOrdersByStatus);
