import { Router } from "express";
import {
  addProduct,
  productDetails,
  updateProductData,
  deleteProduct,
} from "../../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/add-product", addProduct);
productRouter.get("/product-details/:id", productDetails);
productRouter.post("/update-product/:id", updateProductData);
productRouter.delete("/delete-product/:id", deleteProduct);

export default productRouter;
