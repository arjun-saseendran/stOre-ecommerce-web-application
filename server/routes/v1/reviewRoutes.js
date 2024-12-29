import { Router } from "express";
import {
  addReview,
  getProductReview,
  getAverageRating,
  deleteReview,
} from "../../controllers/reviewControllers.js";
import { userAuth } from "../../middlewares/userAuth.js";

// Configure router
export const reviewRouter = Router();

// Add review
reviewRouter.post("/add-review", userAuth, addReview);

// Display product review
reviewRouter.get("/get-review/:id", getProductReview);

// Get average review
reviewRouter.post("/get-avg-rating" , getAverageRating);

// Delete review
reviewRouter.delete("/delete-review", userAuth, deleteReview);
