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

// Acitvate user
export const activateUser = async (req, res) => {
   try {
     // Get user id
     const {userId} =  req.user
     
     // Get user
     const inactiveUser = await User.findById(userId)
 
     // Acivate user
     inactiveUser.isActive = true

     res.status(202).json({message: 'User activated'})
 
   } catch (error) {
     // Handle catch error
     catchErrorHandler(res, error);
   }

}