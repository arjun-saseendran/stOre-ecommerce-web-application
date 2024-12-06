import { Router } from "express";
import {
  sellerSignup,
  sellerLogin,
  sellerLogout,
  sellerProfile,
  updatesellerProfile,
  checkseller,
  deactivateseller,
} from "../../controllers/seller.controller.js";
import { sellerAuth } from "../../middlewares/auth.seller.js";

export const sellerRouter = Router();

sellerRouter.post("/signup", sellerSignup);
sellerRouter.post("/login", sellerLogin);
sellerRouter.post("/logout", sellerAuth, sellerLogout);
sellerRouter.get("/profile", sellerAuth, sellerProfile);
sellerRouter.put("/update-profile", sellerAuth, updatesellerProfile);
// sellerRouter.put('/forgot-password', sellerForgotPassword)
sellerRouter.put("/deactivate", sellerAuth, deactivateseller);
sellerRouter.get("/check-seller", sellerAuth, checkseller);


