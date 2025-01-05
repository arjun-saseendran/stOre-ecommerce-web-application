import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    // Find all data
    const orders = await Order.find();

    if (!orders) {
      return res.status(404).json({ message: "No orders found!" });
    }

    // Send data to frontend
    res
      .status(200)
      .json({ message: "Orders fetched successfully!", data: orders });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Filter orders by status
export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Find all data
    const ordersByStatus = await Order.find({ orderStatus: status }).populate(
      "products.productId",
      "title"
    );

    if (!ordersByStatus) {
      return res.status(404).json({ message: "No orders found!" });
    }

    // Send data to frontend
    res.status(200).json({
      message: "Orders by status fetched successfully!",
      data: ordersByStatus,
    });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get order details
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Get order details
    const ordersDetails = await Order.findById(orderId).populate(
      "products.productId",
      "title image price"
    );

    if (!ordersDetails) {
      return res.status(404).json({ message: "No order details found!" });
    }

    // Send data to frontend
    res.status(200).json({
      message: "Order details fetched successfully!",
      data: ordersDetails,
    });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get seller orders
export const getSellerOrders = async (req, res) => {
  try {
    // Get seller id
    const userId = req.user.id;

    // Validate sellerId
    if (!userId) {
      return res.status(400).json({ error: "Seller not found" });
    }

    // Find all products associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle no product found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    const productIds = sellerProducts.map((product) => product._id);

    // Find all orders containing products associated with this seller
    let orders = await Order.find({
      "products.productId": { $in: productIds },
    }).populate("products.productId", "title price image");

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller" });
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
// Get orders base seller
export const getSellerOrdersByStatus = async (req, res) => {
  try {
    // Get seller id
    const userId = req.user.id;

    // Get status
    const { status } = req.body;

    // Validate sellerId
    if (!userId) {
      return res.status(400).json({ error: "Seller not found" });
    }

    // Find all products associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle no product found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    const productIds = sellerProducts.map((product) => product._id);

    // Find all orders containing products associated with this seller
    let ordersByStatus = await Order.find({
      "products.productId": { $in: productIds },
    }).populate("products.productId", "title price image");

    if (!ordersByStatus.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller" });
    }

    // Filter the orders by status
    if (status) {
      ordersByStatus = ordersByStatus.filter(
        (order) => order.orderStatus === status
      );
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      data: ordersByStatus,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Change order status
export const handleOrderStatus = async (req, res) => {
  try {
    // Get order id
    const { orderId, status } = req.body;

    // Handle status is not found
    if (!status) {
      return res.status(400).json({ message: "Provide status" });
    }

    // Handle order id not found
    if (!orderId) {
      return res.status(400).json({ message: "Provide orderId" });
    }

    // Find order
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: status,
      },
      { new: true }
    );

    // Handle order not found case
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Response sent to frontend
    res.status(200).json({ message: "Order status updated", data: order });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get user order
export const getUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Handle not user id not found
    if (!userId) {
      return res.status(400).json({ message: "User id not found" });
    }

    // Get user order details
    const userOrder = await Order.find({ userId })

      .populate("products.productId", "title price image quantity")
      .exec();

    // Handle orders not found
    if (!userOrder) {
      return res.status(404).json({ message: "No order found" });
    }

    // Send data to frontend
    return res
      .status(200)
      .json({ message: "User order fetched successfully", data: userOrder });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Handle stock
export const updateStock = async (req, res) => {
  try {
    // Get user
    const userId = req.user.id;

    // Find latest successful order of the user
    const latestOrder = await Order.findOne({
      userId,
      orderStatus: "processing",
    }).populate("products.productId");

    // Handle order not found case
    if (!latestOrder) {
      return res.status(404).json({ message: "No completed orders found" });
    }

    // Update stock for products in the order
    await Promise.all(
      latestOrder.products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (product) {
          // Decrease product stock
          product.stock = Math.max(0, product.stock - item.quantity);
          await product.save();
        }
      })
    );

    return res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get total price by product category from all orders
export const getOrderTotalPriceByCategory = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find().select("_id category");

    // Handle no products found
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    const productIds = products.map((product) => product._id);

    // Find all orders containing products
    const orders = await Order.find({
      "products.productId": { $in: productIds },
    })
      // Populate category field from product
      .populate("products.productId", "title price image category")

      // Select product fields
      .select("products orderStatus totalPrice createdAt");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Create new object for storing category total price
    const categoryTotalPrice = {};

    orders.forEach((order) => {
      order.products.forEach((product) => {
        // Get category from populated product data
        const category = product.productId.category;

        // Get the product quantity
        const quantity = product.quantity;

        // Get product price
        const price = product.productId.price;

        // Calculate total price for the category (price * quantity)
        const totalProductPrice = price * quantity;

        // Aggregate the total price per category
        if (categoryTotalPrice[category]) {
          categoryTotalPrice[category] += totalProductPrice;
        } else {
          categoryTotalPrice[category] = totalProductPrice;
        }
      });
    });

    // Format the data for sending in response
    const formattedCategoryTotalPrice = Object.keys(categoryTotalPrice).map(
      (category) => ({
        category,
        totalPrice: categoryTotalPrice[category],
      })
    );

    res.status(200).json({
      message: "Total price by category fetched successfully",
      data: formattedCategoryTotalPrice,
    });
  } catch (error) {
    // Handle error
    catchErrorHandler(res, error);
  }
};

// Get total price by product category by seller orders
export const getSellerOrderTotalPriceByCategory = async (req, res) => {
  try {
    // Get seller id
    const userId = req.user.id;

    // Handle seller not found
    if (!userId) {
      return res.status(400).json({ error: "Seller not found" });
    }

    // Find seller products
    const sellerProducts = await Product.find({ seller: userId }).select(
      "_id category price"
    );

    // Handle no products found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    const productIds = sellerProducts.map((product) => product._id);

    // Find seller orders
    const orders = await Order.find({
      "products.productId": { $in: productIds },
    })
      // Populate category, title, price, and image from product
      .populate("products.productId", "title price image category")
      // Select product fields
      .select("products totalPrice orderStatus createdAt");

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller" });
    }

    // Create new object to store category-based total price data
    const categoryTotalPrice = {};

    orders.forEach((order) => {
      order.products.forEach((product) => {
        // Get category from populated product data
        const category = product.productId.category;

        // Get quantity from the order
        const quantity = product.quantity;

        // Get product price
        const price = product.productId.price;

        // Calculate the total product price
        const totalProductPrice = price * quantity;

        // Aggregate the total price by category
        if (categoryTotalPrice[category]) {
          categoryTotalPrice[category] += totalProductPrice;
        } else {
          categoryTotalPrice[category] = totalProductPrice;
        }
      });
    });

    // Format the data for sending in response
    const formattedCategoryTotalPrice = Object.keys(categoryTotalPrice).map(
      (category) => ({
        category,
        totalPrice: categoryTotalPrice[category],
      })
    );

    res.status(200).json({
      message:
        "Seller orders by category with total price fetched successfully",
      data: formattedCategoryTotalPrice,
    });
  } catch (error) {
    // Handle error
    catchErrorHandler(res, error);
  }
};

// Search orders by status and orderId as string match
export const searchOrders = async (req, res) => {
  try {
    const { searchResult, status } = req.body;

    if (searchResult && searchResult.trim() !== "") {
      // Search by orderStatus and treat orderId as string match
      const searchResults = await Order.find({
        orderStatus: status,
        _id: searchResult, // Direct match for the provided ID
      });

      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching orders found" });
      }

      return res.status(200).json({
        message: "Orders fetched successfully",
        data: searchResults,
      });
    } else {
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Search seller orders by status and orderId as string match
export const searchSellerOrders = async (req, res) => {
  try {
    const userId = req.user.id;  // Seller ID from authenticated user
    const { searchResult, status } = req.body;

    // Validate sellerId
    if (!userId) {
      return res.status(400).json({ error: "Seller not found" });
    }

    // Find all product IDs associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    const productIds = sellerProducts.map((product) => product._id);

    if (searchResult && searchResult.trim() !== "") {
      // Search by orderStatus and treat orderId as string match
      const searchResults = await Order.find({
        _id: searchResult, // Direct match for order ID
        orderStatus: status,
        "products.productId": { $in: productIds },
      }).populate("products.productId", "title price image");

      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching orders found" });
      }

      return res.status(200).json({
        message: "Orders fetched successfully",
        data: searchResults,
      });
    } else {
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
