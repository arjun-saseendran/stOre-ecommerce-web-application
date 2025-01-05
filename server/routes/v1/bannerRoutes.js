import { Router } from "express";
import {
  addBanner,
  deleteBanner,
  getBanners,
  getBlackBanner,
  getYellowBanner,
  getSellerBanners,
  searchBanner,
  searchSellerBanners,
} from "../../controllers/bannerControllers.js";
import { upload } from "../../middlewares/multer.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";
import { adminAuth } from "../../middlewares/adminAuth.js";

// Configure router
export const bannerRouter = Router();

// Add new banner
bannerRouter.post("/add-banner", sellerAuth, upload.single("image"), addBanner);

// Get banners
bannerRouter.get("/banners", adminAuth, getBanners);

// Search banners
bannerRouter.post("/search-banners", adminAuth, searchBanner);

// Get banners
bannerRouter.post("/search-seller-banners", sellerAuth, searchSellerBanners);

// Get seller banners
bannerRouter.get("/seller-banners", sellerAuth, getSellerBanners);

// Get black banner
bannerRouter.get("/black-banners", getBlackBanner);

// Get yellow banner
bannerRouter.get("/yellow-banners", getYellowBanner);

// Delete banner
bannerRouter.delete("/delete-banner", sellerAuth, deleteBanner);
