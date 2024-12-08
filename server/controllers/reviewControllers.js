import { Review } from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Add review
export const reviewIncrement = async () => {
  try {
    const reviewProduct = await Product.findById(req.param.id);
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
