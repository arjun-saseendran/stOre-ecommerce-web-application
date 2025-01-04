import { Product } from "../models/productModel.js";
import { Seller } from "../models/sellerModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// Add product
export const addProduct = async (req, res) => {
  try {
    // Destructing data from request body
    const { title, description, price, stock, category } = req.body;
    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Get seller id
    const sellerId = req.user.id;

    // Handle upload image
    const uploadResult = await cloudinaryInstance.uploader.upload(
      req.file.path
    );

    // Creating new product object
    const product = new Product({
      title,
      description,
      price,
      stock,
      category,
      image: uploadResult.url,
      seller: sellerId,
    });

    // Save new product to database
    await product.save();

    // Set product to seller
    await Seller.findOneAndUpdate(
      { _id: sellerId },
      { $push: { products: product._id } },
      { new: true }
    );

    res.json({ message: "Product created successfully", data: product });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Check product cart empty
    if (!products.length) {
      return res.status(404).json({ message: "No product found" });
    }
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
    const { productId } = req.params;
    const productData = await Product.findById(productId);

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
    const { productId } = req.params;

    // Destructing data from request body
    const { title, description, price, stock, category } = req.body;
    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Handle upload image
    let imageUrl = null;

    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(
        req.file.path
      );
      imageUrl = uploadResult.url;
    }
    console.log(req.file);

    // Update product data
    const updatedProductData = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        price,
        stock,
        category,
        image: imageUrl || undefined,
      },
      { new: true }
    );

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
    const { productId } = req.body;
    const product = await Product.findByIdAndDelete(productId);

    // Handle product not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send response to frontend
    res.status(200).json({ message: "Product deleted", data: product });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Category search
export const productCategory = async (req, res) => {
  try {
    // Get data from body
    const { category } = req.body;

    // Validate input
    if (!category || category.trim() === "") {
      return res.status(400).json({ message: "Category is required" });
    }

    // Find category
    const selectedCategory = await Product.find({ category });

    // Handle response
    if (!selectedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Send response to frontend
    res
      .status(200)
      .json({ message: "Product category fetched", data: selectedCategory });
  } catch (error) {
    // Handel error
    catchErrorHandler(res, error);
  }
};

// Search product
export const searchProduct = async (req, res) => {
  try {
    // Get data from body
    const { searchResult } = req.body;

    // Validate input
    if (!searchResult || searchResult.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Find product
    const searchResults = await Product.find({
      $or: [
        { title: { $regex: searchResult, $options: "i" } },
        { description: { $regex: searchResult, $options: "i" } },
        { category: { $regex: searchResult, $options: "i" } },
      ],
    });

    // Handle response
    if (!searchResults) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send response to frontend
    res.status(200).json({ message: "Products fetched", data: searchResults });
  } catch (error) {
    // Handel error
    catchErrorHandler(res, error);
  }
};

// Display products by seller
export const getSellerProducts = async (req, res) => {
  try {
    // Get user id
    const userId = req.user.id;

    // Get products
    const products = await Seller.findById(userId).populate("products");

    // Check products exists
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }

    // Display products
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search seller products
export const searchSellerProducts = async (req, res) => {
  try {
    // Get user id
    const userId = req.user.id;

    // Get search value
    const { searchResult } = req.body;

    // Validate search value
    if (searchResult && searchResult.trim() !== "") {
      // Search for products by title, description, or category
      const searchResults = await Product.find({
        seller: userId,
        $or: [
          { title: { $regex: searchResult, $options: "i" } },
          { description: { $regex: searchResult, $options: "i" } },
          { category: { $regex: searchResult, $options: "i" } },
        ],
      });

      // Handle search result
      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching products found" });
      }

      // Return search results
      return res
        .status(200)
        .json({ message: "Products found", data: searchResults });
    } else {
      // If no search value, return all products for the seller
      const sellerProducts = await Seller.findById(userId).populate("products");

      // Check if seller has products
      if (!sellerProducts || !sellerProducts.products.length) {
        return res
          .status(404)
          .json({ message: "No products found for this seller" });
      }

      // Send data to frontend
      return res
        .status(200)
        .json({
          message: "Products fetched successfully",
          data: sellerProducts.products,
        });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
