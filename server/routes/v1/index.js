import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { sellerRouter } from "./sellerRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import { productRouter } from "./productRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
import { bannerRouter } from "./bannerRoutes.js";
import { wishlistRouter } from "./wishlistRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";
import { orderRouter } from "./orderRoutes.js";

// Configure router
export const v1Router = Router();

v1Router.use("/user", userRouter);
v1Router.use("/seller", sellerRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/product", productRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/review", reviewRouter);
v1Router.use("/banner", bannerRouter);
v1Router.use("/wishlist", wishlistRouter);
v1Router.use('/order', orderRouter)
v1Router.use('/payment', paymentRouter)
