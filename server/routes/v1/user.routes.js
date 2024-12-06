import { Router } from "express";
import {userSignup, userLogin, userLogout, userProfile, checkUser} from '../../controllers/user.controllers.js'
import {userAuth} from '../../middlewares/auth.user.js'

const userRouter = Router();

userRouter.post('/signup', userSignup)
userRouter.post('/login', userLogin)
userRouter.get('/profile', userAuth, userProfile)
userRouter.put('/update', updateUserProfile)
userRouter.put('/forgot-password', userForgotPassword)
userRouter.put('/deactivate', userUserDeactivate)

export default userRouter