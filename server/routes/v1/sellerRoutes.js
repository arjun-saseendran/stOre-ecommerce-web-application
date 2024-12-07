import { Router } from "express";
import {
  sellerSignup,
  sellerLogin,
  sellerLogout,
  sellerProfile,
  updatesellerProfile,
  checkseller,
  deactivateseller,
} from "../../controllers/sellerControllers.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";

//configure router
export const sellerRouter = Router();

// register new seller
sellerRouter.post("/signup", sellerSignup);

// login seller
sellerRouter.post("/login", sellerLogin);

// logout seller
sellerRouter.post("/logout", sellerAuth, sellerLogout);

// display seller profile
sellerRouter.get("/profile", sellerAuth, sellerProfile);

// update seller profile details
sellerRouter.put("/update-profile", sellerAuth, updatesellerProfile);

// reset seller profile password
// sellerRouter.put('/forgot-password', sellerForgotPassword)

// deacivate seller profile
sellerRouter.put("/deactivate", sellerAuth, deactivateseller);

// check seller when routing
sellerRouter.get("/check-seller", sellerAuth, checkseller);


