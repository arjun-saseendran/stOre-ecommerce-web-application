import { Router } from "express";
import {
  addProduct,
  productDetails,
  updateProductData,
  deleteProduct,
} from "../../controllers/productControllers.js";

// configure router
export const productRouter = Router();

// add new product
productRouter.post("/add-product", addProduct);

// dispaly product details
productRouter.get("/product-details/:id", productDetails);

// update product details
productRouter.post("/update-product/:id", updateProductData);

// delete product
productRouter.delete("/delete-product/:id", deleteProduct);


