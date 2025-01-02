import { Router } from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";
import { userAuth} from '../../middlewares/userAuth.js'
import { getOrders } from "../../controllers/orderControllers.js";

// Configure router
export const orderRouter = Router();


// Get all orders
orderRouter.get("/get-orders", adminAuth, getOrders);
