import { Router } from "express";
import {
  addBanner,
  deleteBanner,
  getBanners,
  getBlackBanner,
  getYellowBanner,
} from "../../controllers/bannerControllers.js";
import { upload } from "../../middlewares/multer.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";

// Configure router
export const bannerRouter = Router();

// Add new banner
bannerRouter.post("/add-banner", sellerAuth, upload.single("image"), addBanner);

// Get banners
bannerRouter.get("/banners", sellerAuth, getBanners);

// Get black banner
bannerRouter.get("/black-banners", getBlackBanner);

// Get yellow banner
bannerRouter.get("/yellow-banners", getYellowBanner);

// Delete banner
bannerRouter.delete("/delete-banner", sellerAuth, deleteBanner);
