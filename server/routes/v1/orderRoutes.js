import { Router } from "express";
import { adminAuth } from "../../middlewares/adminAuth";
import { sellerAuth } from "../../middlewares/sellerAuth";
import { userAuth} from '../../middlewares/userAuth'
import { getOrders } from "../../controllers/orderControllers";




// Configure router
export const orderRouter = Router();


// Get all orders
orderRouter.get("/get-orders", adminAuth, getOrders);
