import { Review } from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Add rating
export const addRating = async (req, res) => {
  try {
    // Get product id
    const {productId} = req.param

    //Get product
    const product = await Product.findById(productId);

    // Set correct value
    if(product.rating >= 0 && product.rating <= 5){
      product.rating++
    }

    res.status(202).json({message: 'Rating added'})
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
