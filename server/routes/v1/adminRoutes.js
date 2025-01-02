import { Router } from "express";
import { adminAuth } from "../../middlewares/adminAuth";
import {
  adminProfile,
  updateAdminProfile,
  adminForgotPassword,
  adminResetPassword,
  checkAdmin,
} from "../../controllers/adminControllers";

// Configure router
export const adminRouter = Router();

// Admin profile details
adminRouter.get("/admin-profile", adminAuth, adminProfile);

// Update admin profile details
adminRouter.put(
  "/admin/update-profile",
  upload.single("profilePicture"),
  adminAuth,
  updateAdminProfile
);

// Forgot password
adminRouter.post("/admin/forgot-password", adminForgotPassword);

// Reset password
adminRouter.post("/admin/reset-password/:token", adminResetPassword);

// Check admin when routing
adminRouter.get("/check-admin", adminAuth, checkAdmin);
