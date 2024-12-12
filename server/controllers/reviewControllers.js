import { Review } from "../models/reviewModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Add rating
export const addReview = async (req, res) => {
  try {
    // Get data from request body
    const { comment, rating } = req.body;

    // Check rating
    if (rating < 0 && rating > 5) {
      return res.status(400).json({ message: "Provide valid inuput" });
    }

    // Get product id
    const { productId } = req.param;

    // Get user id
    const { userId } = req.user;

    // Create new review object
    const review = new Review({ userId, productId, rating, comment });

    // Save review
    await review.save();

    res.status(202).json({ message: "Review added", data: review });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
