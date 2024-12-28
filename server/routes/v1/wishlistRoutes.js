import { Router } from "express";
import { addToWishlist, removeProductFromWishlist, getWishlist} from "../../controllers/wishlistControllers.js";
import {userAuth} from '../../middlewares/userAuth.js'

// Configure router
export const wishlistRouter = Router();

// Add to product to wishlist
wishlistRouter.post("/add-product", userAuth, addToWishlist);

// Display wishlist products
wishlistRouter.get('/wishlist', userAuth, getWishlist)

// Remove product from wishlist
wishlistRouter.delete("/remove-product", userAuth, removeProductFromWishlist);


