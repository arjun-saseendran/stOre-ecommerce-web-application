import { Product } from "../models/productModel.js";
import { Seller } from "../models/sellerModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// Add product
export const addProduct = async (req, res) => {
  try {
    // Destructing data from request body
    const { title, description, price, stock, image } = req.body;
    if (!title || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Get seller id
    const { sellerId } = req.seller;

    // Get seller
    const seller = await Seller.findById(sellerId);

    // Handle upload image
    const uploadResult = await cloudinaryInstance.uploader.upload(
      req.file.path
    );

    // Creating new product object
    const newProduct = new Product({
      title,
      description,
      price,
      stock,
      image: uploadResult.url,
      seller: seller._id,
    });

    // Save new product to database
    await newProduct.save();

    // Set product to seller
    await Seller.findOneAndUpdate(
      sellerId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    res.json({ message: "Product created succfully", data: newProduct });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

export const renderProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "Products render successfully", data: products });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Product details
export const productDetails = async (req, res) => {
  try {
    // Get product id
    const { id } = req.param;
    const productData = await Product.findById(id);

    res
      .status(200)
      .json({ message: "Product details fetched", data: productData });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Update product details
export const updateProductData = async (req, res) => {
  try {
    // Get product id
    const { id } = req.param;

    // Update product data
    const updatedProductData = await Product.findByIdAndUpdate(
      id,
      req.body
    ).select("-password");

    res
      .status(200)
      .json({ message: "Product details updated", data: updatedProductData });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Get product id
    const { id } = req.param;
    const delProduct = await Product.findByIdAndDelete(id);

    res.status(204).json({ message: "Product deleted", data: delProduct });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
