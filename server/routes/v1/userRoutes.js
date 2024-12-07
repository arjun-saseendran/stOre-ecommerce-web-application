import { Router } from "express";
import {userSignup, userLogin, userLogout, userProfile, updateUserProfile, checkUser, deactivateUser } from '../../controllers/userControllers.js'
import {userAuth} from '../../middlewares/userAuth.js'

// configure router
export const userRouter = Router();

// register new user
userRouter.post('/signup', userSignup)

// login user
userRouter.post('/login', userLogin)

// logout user
userRouter.post("/logout", userAuth, userLogout);

// display user profile
userRouter.get('/profile', userAuth, userProfile)

// update user profile details
userRouter.put("/update-profile", userAuth,updateUserProfile);

// reset user profile password
// userRouter.put('/forgot-password', userForgotPassword)

// decactivate user profile
userRouter.put('/deactivate', userAuth, deactivateUser)

// check user when routing
userRouter.get('/check-user', userAuth, checkUser)

