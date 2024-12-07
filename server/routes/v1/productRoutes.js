import { Router } from "express";
import {
  addProduct,
  productDetails,
  updateProductData,
  deleteProduct,
} from "../../controllers/productControllers.js";

export const productRouter = Router();

productRouter.post("/add-product", addProduct);
productRouter.get("/product-details/:id", productDetails);
productRouter.post("/update-product/:id", updateProductData);
productRouter.delete("/delete-product/:id", deleteProduct);


