import { Router } from "express";
import { addToCart, removeProduct } from "../../controllers/cartControllers.js";

export const cartRouter = Router();

cartRouter.post("/add-product-to-cart", addToCart);
cartRouter.delete("/remove-cart-product/:id", removeProduct);


