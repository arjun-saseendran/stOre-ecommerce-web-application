import { Router } from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import {
  createCheckoutSession,
  getSessionStatus,
  handlePaymentIncomplete,
  handlePaymentComplete,
} from "../../controllers/paymentController.js";

// Configure router
export const paymentRouter = Router();

// Create checkout session
paymentRouter.post("/create-checkout-session", userAuth, createCheckoutSession);

// Handle payment complete
paymentRouter.put("/payment-completed", userAuth, handlePaymentComplete);

// Handle payment incomplete
paymentRouter.put("/payment-cancelled", userAuth, handlePaymentIncomplete);

// Get session status
paymentRouter.get("/session-status", userAuth, getSessionStatus);
