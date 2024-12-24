import { Router } from "express";
import {
  sellerSignup,
  sellerLogin,
  sellerLogout,
  sellerProfile,
  updatesellerProfile,
  checkSeller,
  deactivateSeller,
  getSellers,
  activateSeller,
  checkAdmin,
  deleteSeller
} from "../../controllers/sellerControllers.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";
import { adminAuth } from "../../middlewares/adminAuth.js";
import {upload} from '../../middlewares/multer.js'

// Configure router
export const sellerRouter = Router();

// Register new seller
sellerRouter.post("/signup", upload.single('profilePicture'), sellerSignup);

// Login seller
sellerRouter.post("/login", sellerLogin);

// Display all sellers
sellerRouter.get('/sellers', adminAuth, getSellers)

// Logout seller
sellerRouter.put("/logout", sellerAuth, sellerLogout);

// Display seller profile
sellerRouter.get("/profile", sellerAuth, sellerProfile);

// Update seller profile details
sellerRouter.put("/update-profile", sellerAuth, updatesellerProfile);

// Reset seller profile password
// sellerRouter.put('/forgot-password', sellerForgotPassword)

// Deacivate seller profile
sellerRouter.put("/deactivate-profile", sellerAuth, deactivateSeller);

// Activate seller
sellerRouter.post('/activate-seller', adminAuth, activateSeller)

// Check seller when routing
sellerRouter.get("/check-seller", sellerAuth, checkSeller);

// Check admin when routing
sellerRouter.get("/check-admin", adminAuth, checkAdmin);

// Delete seller
sellerRouter.delete('/delete-seller/:id', adminAuth, deleteSeller)




