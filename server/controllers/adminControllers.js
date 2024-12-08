import { User } from "../models/userModel.js";
import { Seller } from "../models/sellerModel.js";
import { Product } from "../models/productModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Display all users
export const renderAllUsers = async (req, res) => {
  try {
    // Get all users
    const allUsers = await User.find();

    res
      .status(200)
      .json({ message: "All users fetched successfully", data: allUsers });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
