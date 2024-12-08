import { Router } from "express";
import {
  addProduct,
  productDetails,
  updateProductData,
  deleteProduct,
  renderProducts,
} from "../../controllers/productControllers.js";

// Configure router
export const productRouter = Router();

// Add new product
productRouter.post("/add-product", addProduct);

// Display products
productRouter.get('/products', renderProducts)

// Dispaly product details
productRouter.get("/product-details/:id", productDetails);

// Update product details
productRouter.post("/update-product/:id", updateProductData);

// Delete product
productRouter.delete("/delete-product/:id", deleteProduct);


