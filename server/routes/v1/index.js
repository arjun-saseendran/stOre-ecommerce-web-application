import { Router } from "express";
import userRouter from "./user.routes.js";
import sellerRouter from "./seller.routes.js";
import productRouter from "./product.routes.js";
import cartRouter from './cart.routes.js'

const v1Router = Router()

v1Router.use('/user', userRouter)
v1Router.use('/seller', sellerRouter)
v1Router.use('/product', productRouter)
v1Router.use('/cart', cartRouter)

export {v1Router}

