import { Router } from "express";
import {userSignup, userLogin, userLogout, userProfile, updateUserProfile, checkUser, deactivateUser } from '../../controllers/user.controller.js'
import {userAuth} from '../../middlewares/auth.user.js'

const userRouter = Router();

userRouter.post('/signup', userSignup)
userRouter.post('/login', userLogin)
userRouter.post("/logout", userAuth, userLogout);
userRouter.get('/profile', userAuth, userProfile)
userRouter.put("/update-profile", userAuth,updateUserProfile);
// userRouter.put('/forgot-password', userForgotPassword)
userRouter.put('/deactivate', userAuth, deactivateUser)
userRouter.get('/check-user', userAuth, checkUser)

export default userRouter