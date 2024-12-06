import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

// add product to cart
const addToCart = async (req, res) => {
  try {
    // get product
    const addProduct = Product.findById(req.param.id);

    // add product to cart
    const cartProduct = new Cart(addProduct);

    // save cart product to database
    await cartProduct.save();

    res.json({ message: "Product added to cart", data: cartProduct });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// remove product
const removeProduct = async (req, res) => {
  try {
    const removedProduct = await Cart.findByIdAndDelete(req.param.id);

    res.status(204).json({ message: "Product removed", data: removedProduct });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export { addToCart, removeProduct };
