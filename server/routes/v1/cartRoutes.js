import { Router } from "express";
import { addToCart, removeProductFromCart, getCart, clearCart, addToFromWishlistCart, addCartQuantity } from "../../controllers/cartControllers.js";
import {userAuth} from '../../middlewares/userAuth.js'

// Configure router
export const cartRouter = Router();

// Add to product to cart
cartRouter.post("/add-product", userAuth, addToCart);

// Add to product to cart
cartRouter.post("/add-cartQuantity", userAuth, addCartQuantity);

// Add to product to cart from wishlist
cartRouter.post('/add-product-wishlist-to-cart', userAuth, addToFromWishlistCart)

// Display cart products
cartRouter.get('/cart', userAuth, getCart)

// Remove product from cart
cartRouter.delete("/remove-product", userAuth, removeProductFromCart);

// Clear cart
cartRouter.delete('/clear-cart', userAuth, clearCart)


