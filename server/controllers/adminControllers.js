import { User } from "../models/userModel.js";
import { Seller } from "../models/sellerModel.js";
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
    const  userId  = req.params.id;

    // Get user
    const inactiveUser = await User.findById(userId);

    // Acivate user
    inactiveUser.isActive = true;

    res.status(202).json({ message: "User activated" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    // Get user id
    const  userId  = req.params.id;

    // Get user
    const destroyedUser = await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted", data: destroyedUser });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
// Display all sellers
export const renderAllSellers = async (req, res) => {
  try {
    // Get all sellers
    const allSellers = await Seller.find();

    res
      .status(200)
      .json({ message: "All sellers fetched successfully", data: allSellers });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Acitvate seller
export const activateSeller = async (req, res) => {
  try {
    // Get seller id
    const  sellerId  = req.params.id;

    // Get seller
    const inactiveSeller = await Seller.findById(sellerId);

    // Acivate seller
    inactiveSeller.isActive = true;

    res.status(202).json({ message: "Seller activated" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Delete seller
export const deleteSeller = async (req, res) => {
  try {
    // Get seller id
    const  sellerId  = req.params.id;

    // Get seller
    const destroyedSeller = await Seller.findByIdAndDelete(sellerId);

    res.status(202).json({ message: "Seller deleted", data: destroyedSeller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
