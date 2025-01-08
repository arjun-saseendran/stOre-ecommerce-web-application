import { Banner } from "../models/bannerModel.js";
import { Seller } from "../models/sellerModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// Add banner
export const addBanner = async (req, res) => {
  try {
    // Destructing data from request body
    const { title, color } = req.body;

    // Check fields
    if (!title || !color) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Get seller id
    const sellerId = req.user.id;

    // Handle upload image
    const uploadResult = await cloudinaryInstance.uploader.upload(
      req.file.path
    );

    // Creating new banner object
    const banner = new Banner({
      title,
      color,
      image: uploadResult.url,
      seller: sellerId,
    });

    // Save new banner to database
    await banner.save();

    // Set banner to seller
    await Seller.findOneAndUpdate(
      { _id: sellerId },
      { $push: { banners: banner._id } },
      { new: true }
    );

    // Send response to frontend
    res.json({ message: "Banner added successfully", data: banner });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get banners
export const getBanners = async (req, res) => {
  try {
    // Get banners from database
    const banners = await Banner.find();

    // Handle banner not found
    if (!banners.length) {
      return res.status(404).json({ message: "No banners found" });
    }

    // Send response to frontend
    res.status(200).json({
      message: "Banners rendered successfully",
      data: banners,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get seller banners
export const getSellerBanners = async (req, res) => {
  try {
    // Get user id
    const userId = req.user.id;

    // Find the seller by userId and populate the banners 
    const seller = await Seller.findById(userId).populate("banners");

    // Handle seller and banner not found
    if (!seller || !seller.banners || seller.banners.length === 0) {
      return res
      // Handle not found response
        .status(404)
        .json({ message: "No banners found for this seller" });
    }

    // Send response to frontend
    res.status(200).json({
      message: "Seller banners rendered successfully",
      data: seller.banners,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get black banner
export const getBlackBanner = async (req, res) => {
  try {

    // Find black banner
    const blackBanners = await Banner.find({ color: "black" });

    // Check product cart empty
    if (!blackBanners.length) {
      return res.status(404).json({ message: "No black banner found" });
    }

    // Send response to frontend
    res.status(200).json({
      message: "Black banners rendered successfully",
      data: blackBanners,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get yellow banner
export const getYellowBanner = async (req, res) => {
  try {

    // Find yellow banner
    const yellowBanners = await Banner.find({ color: "yellow" });

    // Handle yellow banner not found
    if (!yellowBanners.length) {
      return res.status(404).json({ message: "No yellow banner found" });
    }
    // Send response to frontend
    res.status(200).json({
      message: "Yellow banners rendered successfully",
      data: yellowBanners,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Delete banner
export const deleteBanner = async (req, res) => {
  try {
    // Get banner id
    const { bannerId } = req.body;

    // Find banner and delete
    const banner = await Banner.findByIdAndDelete(bannerId);

    // Handle banner not found
    if (!banner) {
      return res.status(404).json({ message: "Banner not found", data: [] });
    }

    // Send response to frontend
    res.status(200).json({ message: "Banner deleted", data: banner });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search banner
export const searchBanner = async (req, res) => {
  try {
    // Get data from body
    const { searchResult } = req.body;

    // Handle data
    if (!searchResult || searchResult.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Find banner
    const searchResults = await Banner.find({
      $or: [{ title: { $regex: searchResult, $options: "i" } }],
    });

    // Handle not found
    if (!searchResults) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Send response to frontend
    res.status(200).json({ message: "Banner fetched", data: searchResults });
  } catch (error) {
    // Handel error
    catchErrorHandler(res, error);
  }
};

// Search seller banners
export const searchSellerBanners = async (req, res) => {
  try {
    // Get user id
    const userId = req.user.id;

    // Get search value
    const { searchResult } = req.body;

    // Validate search value
    if (searchResult && searchResult.trim() !== "") {
      
      // Search for banners by title
      const searchResults = await Banner.find({
        seller: userId,
        $or: [{ title: { $regex: searchResult, $options: "i" } }],
      });

      // Handle not found
      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching banner found" });
      }

      // Send response to frontend
      return res
        .status(200)
        .json({ message: "Banners found", data: searchResults });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
