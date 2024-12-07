import { Router } from "express";
import { addToCart, removeProduct } from "../../controllers/cartControllers.js";

// configure router
export const cartRouter = Router();

// add to product to cart
cartRouter.post("/add-product-to-cart", addToCart);

// remove porduct from cart
cartRouter.delete("/remove-cart-product/:id", removeProduct);


