import { Product } from "../models/productModel.js";

// add product
export const addProduct = async (req, res) => {
  try {
    // destructing data from request body
    const { title, description, price, stock } = req.body;
    if (!title || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields required" });
    }

    // creating new product object
    const newProduct = new Product({ title, description, price, stock });

    // save new product to database
    await newProduct.save();

    res.json({ message: "Product created succfully", data: newProduct });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// product details
export const productDetails = async (req, res) => {
  try {
    // get product id
    const { id } = req.param;
    const productData = await Product.findById(id);

    res
      .status(200)
      .json({ message: "Product details fetched", data: productData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// update product details
export const updateProductData = async (req, res) => {
  try {
    // get product id
    const { id } = req.param;

    // update product data
    const updatedProductData = await Product.findByIdAndUpdate(
      id,
      req.body
    ).select("-password");

    res
      .status(200)
      .json({ message: "Product details updated", data: updatedProductData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // get product id
    const { id } = req.param;
    const delProduct = await Product.findByIdAndDelete(id);

    res.status(204).json({ message: "Product deleted", data: delProduct });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
