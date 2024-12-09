import { Review } from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Add rating
export const addReview = async (req, res) => {
  try {
    // Get product id
    const { productId } = req.param;

    // Get user id
    const { userId } = req.user;

    // Set product rating to zero
    let rating = 0;

    // Create new review object
    const review = new Review({ userId, productId, rating });

    // Save review

    await review.save()

    res.status(202).json({ message: "Review added", data: review });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
