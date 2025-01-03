import { Router } from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import {upload} from '../../middlewares/multer.js'
import {
  adminProfile,
  updateAdminProfile,
  adminForgotPassword,
  adminResetPassword,
  checkAdmin,
  adminDetails,
  adminLogout,
  adminLogin,
} from "../../controllers/adminControllers.js";

// Configure router
export const adminRouter = Router();

// Admin login
adminRouter.post('/login', adminAuth, adminLogin)

// Admin profile details
adminRouter.get("/profile", adminAuth, adminProfile);

// Update admin profile details
adminRouter.put(
  "/admin/update-profile",
  upload.single("profilePicture"),
  adminAuth,
  updateAdminProfile
);

// Admin details
adminRouter.get("/details/:userId", adminAuth, adminDetails);

// Logout admin
adminRouter.put("/logout", adminAuth, adminLogout);

// Forgot password
adminRouter.post("/admin/forgot-password", adminForgotPassword);

// Reset password
adminRouter.post("/admin/reset-password/:token", adminResetPassword);

// Check admin when routing
adminRouter.get("/check-admin", adminAuth, checkAdmin);
