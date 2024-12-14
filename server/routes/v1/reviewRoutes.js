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
reviewRouter.get("/get-review/:id", userAuth, getProductReview);

// Get average review
reviewRouter.get("/get-avg-rating/:id", userAuth, getAverageRating);

// Delete review
reviewRouter.delete("/delete-review/:id", userAuth, deleteReview);
