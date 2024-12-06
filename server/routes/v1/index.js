import { Router } from "express";
import userRouter from "./user.routes.js";
import sellerRouter from "./seller.routes.js";

const v1Router = Router()

v1Router.use('/user', userRouter)
v1Router.use('/seller', sellerRouter)

export {v1Router}

