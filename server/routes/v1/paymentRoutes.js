import { Router } from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import {
  createCheckoutSession,
  getSessionStatus,
} from "../../controllers/paymentController.js";

// Configure router
export const paymentRouter = Router();

paymentRouter.post("/create-checkout-session", userAuth, createCheckoutSession);

paymentRouter.get("/session-status", userAuth, getSessionStatus);
