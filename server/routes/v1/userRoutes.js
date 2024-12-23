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
  deleteUser
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
userRouter.put("/logout", userAuth, userLogout);

// Display user profile
userRouter.get("/profile", userAuth, userProfile);

// Update user profile details
userRouter.put("/update-profile", userAuth, updateUserProfile);

// Decactivate user profile
userRouter.put("/deactivate-profile", userAuth, deactivateUser);

// Display all inactive users
userRouter.get('/users-inactive', adminAuth, getInactiveUsers)

// Activate user
userRouter.put('/activate-user', adminAuth, activateUser)

// Check user when routing
userRouter.get("/check-user", userAuth, checkUser);

// Delete user
userRouter.delete('/delete-user', adminAuth, deleteUser)
