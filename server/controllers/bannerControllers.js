import { Banner } from "../models/bannerModel.js";
import { Seller } from "../models/sellerModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// Add banner
export const addBanner = async (req, res) => {
  try {
    // Destructing data from request body
    const { title, color } = req.body;
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

    res.json({ message: "Banner added successfully", data: banner });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();

    // Handle banner not found
    if (!banners.length) {
      return res.status(404).json({ message: "No banners found" });
    }
    res
      .status(200)
      .json({
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
    
    // Get user 
    const userid = req.user.id
    
    const sellerBanners = await Banner.findById(userid);

    // Handle banner not found
    if (!banners.length) {
      return res.status(404).json({ message: "No banners found for this seller" });
    }
    res
      .status(200)
      .json({
        message: "Seller banners rendered successfully",
        data: sellerBanners,
      });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get banner black banner
export const getBlackBanner = async (req, res) => {
  try {
    const blackBanners = await Banner.find({ color: "black" });

    // Check product cart empty
    if (!blackBanners.length) {
      return res.status(404).json({ message: "No black banner found" });
    }
    res
      .status(200)
      .json({
        message: "Black banners rendered successfully",
        data: blackBanners,
      });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get banner yellow banner
export const getYellowBanner = async (req, res) => {
  try {
    const yellowBanners = await Banner.find({ color: "yellow" });

    // Check product cart empty
    if (!yellowBanners.length) {
      return res.status(404).json({ message: "No yellow banner found" });
    }
    res
      .status(200)
      .json({
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
