import { Router } from "express";
import {
  addProduct,
  productDetails,
  updateProductData,
  deleteProduct,
  getProducts,
  productCategory,
  searchProduct,
  getSellerProducts,
} from "../../controllers/productControllers.js";
import { upload } from "../../middlewares/multer.js";
import { sellerAuth } from "../../middlewares/sellerAuth.js";

// Configure router
export const productRouter = Router();

// Add new product
productRouter.post(
  "/add-product",
  sellerAuth,
  upload.single("image"),
  addProduct
);

// Display products
productRouter.get("/products", getProducts);

// Display products based seller
productRouter.get("/seller-products", sellerAuth, getSellerProducts);

// Display products by category
productRouter.post("/category", productCategory);

// Display products by search
productRouter.post("/search", searchProduct);

// Display product details
productRouter.get("/product-details/:productId", productDetails);

// Update product details
productRouter.put("/update-product/:productId", updateProductData);

// Delete product
productRouter.delete("/delete-product", deleteProduct);
