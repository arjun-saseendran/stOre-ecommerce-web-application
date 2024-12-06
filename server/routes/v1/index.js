import { Router } from "express";
import userRouter from "./user.routes.js";
import sellerRouter from "./seller.routes.js";
import productRouter from "./product.routes.js";

const v1Router = Router()

v1Router.use('/user', userRouter)
v1Router.use('/seller', sellerRouter)
v1Router.use('/product', productRouter)

export {v1Router}

