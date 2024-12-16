import { Router } from "express";
import {
  addProduct,
  productDetails,
  updateProductData,
  deleteProduct,
  renderProducts,
  productCategory,
} from "../../controllers/productControllers.js";
import {upload} from '../../middlewares/multer.js'
import { sellerAuth } from "../../middlewares/sellerAuth.js";

// Configure router
export const productRouter = Router();

// Add new product
productRouter.post("/add-product", sellerAuth, upload.single('image'), addProduct);

// Display products
productRouter.get('/products', renderProducts)

// Display products by category
productRouter.post('/category', productCategory)

// Dispaly product details
productRouter.get("/product-details/:id", productDetails);

// Update product details
productRouter.put("/update-product/:id", updateProductData);

// Delete product
productRouter.delete("/delete-product/:id", deleteProduct);


