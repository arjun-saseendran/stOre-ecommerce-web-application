import { Router } from "express";
import { addToCart, removeProduct, renderCartProducts } from "../../controllers/cartControllers.js";

// Configure router
export const cartRouter = Router();

// Add to product to cart
cartRouter.post("/add-product-to-cart", addToCart);

// Display cart products
cartRouter.get('/cart', renderCartProducts)

// Remove porduct from cart
cartRouter.delete("/remove-cart-product/:id", removeProduct);


