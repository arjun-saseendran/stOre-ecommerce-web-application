import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";
import {catchErrorHandler} from '../utils/catchErrorHandler.js'

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    // Get product id
    const { id } = req.param;
    

    // Get product
    const addProduct = Product.findById(id);

    // Add product to cart
    const cartProduct = new Cart({addProduct, products: [{id}]});

   // Save cart product to database
    await cartProduct.save();

    res.json({ message: "Product added to cart", data: cartProduct });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Render cart products
export const renderCartProducts = async(req, res) => {
  try {
    
    // Get user id
    const {userId} = req.user

    // Get cart
    const cart = await Cart.findOne({userId}).populate('products.productId')

    // Check cart exists
    if(!cart){
      return res.status(404).json({message: 'Cart not found'})
    }
    
    // Display cart
    res.status(200).json({message: 'Cart fetched successfully', data: cart})
    
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
}

// Remove product
export const removeProduct = async (req, res) => {
  try {
    // Get product id
    const { id } = req.param;

    // Remove product
    const removedProduct = await Cart.findByIdAndDelete(id);

    res.status(204).json({ message: "Product removed", data: removedProduct });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
