import { Router } from "express";
import {
  sellerSignup,
  sellerLogin,
  sellerLogout,
  sellerProfile,
  updateSellerProfile,
  checkSeller,
  deactivateSeller,
  getSellers,
  activateSeller,
  checkAdmin,
  deleteSeller,
  sellerDetails,
  getInactiveSellers,
  adminProfile,
  getActiveSellers
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
sellerRouter.put("/update-profile", sellerAuth, updateSellerProfile);

// Deactivate seller profile
sellerRouter.put("/deactivate-profile", sellerAuth, deactivateSeller);

// Activate seller
sellerRouter.put('/activate-seller', adminAuth, activateSeller)

// Check seller when routing
sellerRouter.get("/check-seller", sellerAuth, checkSeller);

// Check admin when routing
sellerRouter.get("/check-admin", adminAuth, checkAdmin);

// Delete seller
sellerRouter.delete('/delete-seller', adminAuth, deleteSeller)

// Seller details
sellerRouter.get('/seller-details/:userId', adminAuth, sellerDetails)

// Inactive sellers
sellerRouter.get("/active-sellers", adminAuth, getActiveSellers)

// Inactive sellers
sellerRouter.get("/inactive-sellers", adminAuth, getInactiveSellers)

// Admin profile details
sellerRouter.get("/admin-profile", adminAuth, adminProfile)

// Forgot password
sellerRouter.post("/forgot-password", forgotPassword  );

// Reset password
sellerRouter.post("/reset-password/:token", resetPassword);





