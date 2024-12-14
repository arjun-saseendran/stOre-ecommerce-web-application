import { Router } from "express";
import { addToCart, removeProductFromCart, renderCart, clearCart } from "../../controllers/cartControllers.js";
import {userAuth} from '../../middlewares/userAuth.js'

// Configure router
export const cartRouter = Router();

// Add to product to cart
cartRouter.post("/add-product", userAuth, addToCart);

// Display cart products
cartRouter.get('/cart', userAuth, renderCart)

// Remove porduct from cart
cartRouter.delete("/remove-product", userAuth, removeProductFromCart);

// Clear cart
cartRouter.delete('/clear-cart', userAuth, clearCart)


