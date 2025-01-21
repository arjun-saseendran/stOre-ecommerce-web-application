import { Router } from "express";
import {
  userSignup,
  userLogin,
  userLogout,
  userProfile,
  updateUserProfile,
  checkUser,
  deactivateUser,
  getUsers,
  getInactiveUsers,
  activateUser,
  deleteUser,
  getActiveUsers,
  userForgotPassword,
  userResetPassword,
  userDetails,
  searchActiveUsers,
  searchInactiveUsers,
} from "../../controllers/userControllers.js";
import { userAuth } from "../../middlewares/userAuth.js";
import { adminAuth } from "../../middlewares/adminAuth.js";
import { upload } from "../../middlewares/multer.js";

// Configure router
export const userRouter = Router();

// Register new user
userRouter.post("/signup", upload.single("profilePicture"), userSignup);

// Login user
userRouter.post("/login", userLogin);

// Display all users
userRouter.get('/users', adminAuth, getUsers)

// Logout user
userRouter.post("/logout", userAuth, userLogout);

// Display user profile
userRouter.get("/profile", userAuth, userProfile);

// User details
userRouter.get("/details/:userId", userAuth, userDetails);

// Update user profile details
userRouter.put("/update-profile", upload.single("profilePicture"), userAuth, updateUserProfile);

// Deactivate user profile
userRouter.put("/deactivate-profile", userAuth, deactivateUser);

// Display all inactive users
userRouter.get('/users-inactive', adminAuth, getInactiveUsers)

// Activate user
userRouter.put('/activate-user', adminAuth, activateUser)

// Check user when routing
userRouter.get("/check-user", userAuth, checkUser);

// Delete user
userRouter.delete('/delete-user', adminAuth, deleteUser)

// Display inactive users
userRouter.get('/inactive-users', adminAuth, getInactiveUsers)

// Display active users
userRouter.get('/active-users', adminAuth, getActiveUsers)

// Forgot password
userRouter.post("/forgot-password", userForgotPassword  );

// Reset password
userRouter.post("/reset-password/:token", userResetPassword);

// Search active users
userRouter.post("/search-active-users", adminAuth, searchActiveUsers);

// Search inactive users
userRouter.post("/search-inactive-users", adminAuth, searchInactiveUsers);

