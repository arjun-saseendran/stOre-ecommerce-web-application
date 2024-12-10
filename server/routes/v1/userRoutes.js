import { Router } from "express";
import {userSignup, userLogin, userLogout, userProfile, updateUserProfile, checkUser, deactivateUser } from '../../controllers/userControllers.js'
import {userAuth} from '../../middlewares/userAuth.js'

// Configure router
export const userRouter = Router();

// Register new user
userRouter.post('/signup', userSignup)

// Login user
userRouter.post('/login', userLogin)

// Logout user
userRouter.post("/logout", userAuth, userLogout);

// Display user profile
userRouter.get('/profile', userAuth, userProfile)

// Update user profile details
userRouter.put("/update-profile", userAuth,updateUserProfile);

// Reset user profile password
// userRouter.put('/forgot-password', userForgotPassword)

// Decactivate user profile
userRouter.put('/deactivate-user', userAuth, deactivateUser)

// Check user when routing
userRouter.get('/check-user', userAuth, checkUser)

