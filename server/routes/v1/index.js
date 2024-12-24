import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { sellerRouter } from "./sellerRoutes.js";
import { productRouter } from "./productRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";

// Configure router
export const v1Router = Router();

v1Router.use("/user", userRouter);
v1Router.use("/seller", sellerRouter);
v1Router.use("/product", productRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/review", reviewRouter);
