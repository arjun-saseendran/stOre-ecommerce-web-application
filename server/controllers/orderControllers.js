import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    // Get orders
    const orders = await Order.find();

    // Handle order not found
    if (!orders) {
      return res.status(404).json({ message: "No orders found!" });
    }

    // Send response to frontend
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
    // Get status from request body
    const { status } = req.body;

    // Find and populate order data
    const ordersByStatus = await Order.find({ orderStatus: status }).populate(
      "products.productId",
      "title"
    );

    // Handle no data found
    if (!ordersByStatus) {
      return res.status(404).json({ message: "No orders found!" });
    }

    // Send data to frontend
    res.status(200).json({
      message: "Orders by status fetched successfully!",
      data: ordersByStatus,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get order details
export const getOrderDetails = async (req, res) => {
  try {
    // Get order id from url
    const { orderId } = req.params;

    // Get order details
    const ordersDetails = await Order.findById(orderId).populate(
      "products.productId",
      "title image price"
    );

    // Handle no order details found
    if (!ordersDetails) {
      return res.status(404).json({ message: "No order details found!" });
    }

    // Send data to frontend
    res.status(200).json({
      message: "Order details fetched successfully!",
      data: ordersDetails,
    });
  } catch (error) {
    // Handle catch error
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

    // Collect seller product ids
    const productIds = sellerProducts.map((product) => product._id);

    // Find all orders containing products associated with this seller
    let orders = await Order.find({
      "products.productId": { $in: productIds },
    }).populate("products.productId", "title price image");

    // Handle no data
    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller" });
    }
    // Send response to frontend
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

    // Handle seller not found
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

    // Collect seller product ids
    const productIds = sellerProducts.map((product) => product._id);

    // Find all orders containing products associated with this seller
    let ordersByStatus = await Order.find({
      "products.productId": { $in: productIds },
    }).populate("products.productId", "title price image");

    // Handle order status not found
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
    // Send response to frontend
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

export const updateStock = async (req, res) => {
  try {
    // Get user ID from the authenticated user (assuming the user ID is available in req.user)
    const userId = req.user.id;

    // Find the most recent order for the user and populate product details
    const order = await Order.findOne({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Update stock for each product in the order
    await Promise.all(
      order.products.map(async (item) => {
        const product = item.productId; // productId is populated, no need for extra query
        if (product) {
          // Decrease product stock (ensure stock doesn't go below zero)
          product.stock = Math.max(0, product.stock - item.quantity);
          await product.save();

          console.log(
            `Updated stock for product: ${product._id}, New stock: ${product.stock}`
          );
        }
      })
    );

    // Send response
    return res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating stock:", error); // Log error details for debugging
    catchErrorHandler(res, error); // Pass the error to the centralized error handler
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
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Search seller orders by status and orderId as string match
export const searchSellerOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Seller ID from authenticated user
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
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Handle user return request
export const requestReturn = async (req, res) => {
  try {
    // Get order id from url
    const { orderId } = req.params;

    // Get order id from request body
    const { returnReason } = req.body;

    // Fine the order
    const order = await Order.findById(orderId);

    // Handle order not found
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Handle return status pending
    if (order.returnApprovalStatus !== "pending") {
      return res
        .status(400)
        .json({ message: "Return request already processed or expired" });
    }

    // Set return status
    order.returnStatus = "returned";

    // Save return reason
    order.returnReason = returnReason || "No reason provided";
    await order.save();

    // Send response to frontend
    res
      .status(200)
      .json({ message: "Return request submitted successfully", data: order });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get orders by return status
export const getOrdersByReturnStatus = async (req, res) => {
  try {
    // Get return status from request body
    const { status } = req.body;

    // Find orders with specified return status or default to "eligible"
    const orders = await Order.find({
      returnStatus: status || "eligible",
    }).populate("products.productId");

    // Handle no matching orders found
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the specified return status" });
    }

    // Send orders data in response
    res.status(200).json({ data: orders });
  } catch (error) {
    // Handle errors
    catchErrorHandler(res, error);
  }
};

// Get seller orders by return status
export const getSellerOrdersByReturnStatus = async (req, res) => {
  try {
    // Get seller id from authenticated user
    const userId = req.user.id;

    // Validate sellerId
    if (!userId) {
      return res.status(400).json({ error: "Seller not found" });
    }

    // Find all products associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle no products found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    // Collect seller product IDs
    const productIds = sellerProducts.map((product) => product._id);

    // Get return status from request body
    const { status } = req.body;

    // Find all orders with return status for the seller's products
    const orders = await Order.find({
      "products.productId": { $in: productIds },
      returnStatus: status || "eligible",
    }).populate("products.productId", "title price image");

    // Handle no matching orders found
    if (!orders.length) {
      return res.status(404).json({
        message:
          "No orders found for this seller with the specified return status",
      });
    }

    // Send response to frontend
    res.status(200).json({
      message: "Orders with specified return status fetched successfully",
      data: orders,
    });
  } catch (error) {
    // Handle errors
    catchErrorHandler(res, error);
  }
};

// Get return requests
export const getReturnRequests = async (req, res) => {
  try {
    // Get status from request body
    const { status } = req.body;

    // Find orders with status pending
    const orders = await Order.find({
      returnApprovalStatus: status || "pending",
    }).populate("products.productId");

    // Handle order not found
    if (!orders) {
      return res.status(404).json({ message: "No return requests found" });
    }

    // Send response to frontend
    res.status(200).json({ data: orders });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get return details
export const getReturnDetails = async (req, res) => {
  try {
    // Get order id from URL parameters
    const { orderId } = req.params;

    console.log(orderId);

    // Get the order details by orderId
    const order = await Order.findById(orderId).populate(
      "products.productId",
      "title image price"
    );

    // Handle case where no order is found
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    // Fetch the return approval status and reason (if any)
    const returnDetails = {
      returnApprovalStatus: order.returnApprovalStatus,
      returnReason: order.returnReason || "No reason provided",
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
      products: order.products,
    };

    // Send return details to frontend
    res.status(200).json({
      message: "Return details fetched successfully!",
      data: returnDetails,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching return details" });
  }
};

// Get seller return requests
export const getSellerReturnRequests = async (req, res) => {
  try {
    // Get seller id from authenticated user
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

    // Collect seller product ids
    const productIds = sellerProducts.map((product) => product._id);

    // Get status from request body
    const { status } = req.body;

    // Find all orders with return requests for the seller's products
    const orders = await Order.find({
      "products.productId": { $in: productIds },
      returnApprovalStatus: status || "pending",
    }).populate("products.productId", "title price image");

    // Handle no return requests found
    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No return requests found for this seller" });
    }

    // Send response to frontend
    res.status(200).json({
      message: "Return requests fetched successfully",
      data: orders,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get seller-specific return details
export const getSellerReturnDetails = async (req, res) => {
  try {
    // Get seller id from authenticated user
    const userId = req.user.id;

    // Get order id from URL parameters
    const { orderId } = req.params;

    // Fetch the order details
    const order = await Order.findById(orderId).populate(
      "products.productId",
      "title image price seller"
    );

    // Handle case where order is not found
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    // Filter the products belonging to the seller
    const sellerProducts = order.products.filter(
      (product) => product.productId.seller.toString() === userId.toString()
    );

    // Handle case where no products belong to the seller in this order
    if (!sellerProducts.length) {
      return res
        .status(403)
        .json({ message: "You do not have permission to view this return" });
    }

    // Extract and structure return details
    const returnDetails = {
      returnApprovalStatus: order.returnApprovalStatus,
      returnReason: order.returnReason || "No reason provided",
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
      products: sellerProducts,
    };

    // Send response to frontend
    res.status(200).json({
      message: "Return details fetched successfully!",
      data: returnDetails,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching seller return details" });
  }
};

// Handle return approval or rejection
export const handleReturn = async (req, res) => {
  try {
    // Get action, order id and reason from request body
    const { orderId, action, reason } = req.body;

    // Find the order
    const order = await Order.findById(orderId);

    // Handle order not found
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Handle order status pending
    if (order.returnApprovalStatus !== "pending") {
      return res
        .status(400)
        .json({ message: "Return request already processed" });
    }

    // Handle approve action
    if (action === "approve") {
      for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
      // Set order return status to approved
      order.returnApprovalStatus = "approved";
    } else if (action === "reject") {
      // Set order return status to rejected
      order.returnApprovalStatus = "rejected";
    } else {
      // Handle bad request
      return res.status(400).json({ message: "Invalid action" });
    }

    // Save the reason
    order.returnReason = reason || order.returnReason;
    await order.save();

    // Save response to front end
    res.status(200).json({ message: `Return ${action}d successfully`, order });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Search return requests by status and orderId as string match
export const searchReturnRequests = async (req, res) => {
  try {
    const { searchResult, status } = req.body;

    if (searchResult && searchResult.trim() !== "") {
      // Search by returnApprovalStatus and orderId match
      const searchResults = await Order.find({
        returnApprovalStatus: status,
        _id: searchResult, // Direct match for the provided ID
      }).populate("products.productId", "title price image");

      if (!searchResults || searchResults.length === 0) {
        return res
          .status(404)
          .json({ message: "No matching return requests found" });
      }

      return res.status(200).json({
        message: "Return requests fetched successfully",
        data: searchResults,
      });
    } else {
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Search seller return requests by status and orderId as string match
export const searchSellerReturnRequests = async (req, res) => {
  try {
    const userId = req.user.id; // Seller ID from authenticated user
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
      // Search by returnApprovalStatus and treat orderId as string match
      const searchResults = await Order.find({
        _id: searchResult, // Direct match for order ID
        returnApprovalStatus: status,
        "products.productId": { $in: productIds },
      }).populate("products.productId", "title price image");

      if (!searchResults || searchResults.length === 0) {
        return res
          .status(404)
          .json({ message: "No matching return requests found" });
      }

      return res.status(200).json({
        message: "Return requests fetched successfully",
        data: searchResults,
      });
    } else {
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Search orders by return status for admin
export const searchOrdersByReturnStatus = async (req, res) => {
  try {
    const { status, searchResult } = req.body;

    if (status && status.trim() !== "") {
      // Check if searchResult is provided, which could be orderId or other identifiers
      const searchQuery =
        searchResult && searchResult.trim() !== "" ? { _id: searchResult } : {};

      // Find all orders with the specified returnStatus
      const orders = await Order.find({
        ...searchQuery,
        returnStatus: status || "eligible", // Default to "eligible" if no status provided
      }).populate("products.productId", "title price image");

      if (!orders.length) {
        return res.status(404).json({
          message: "No orders found with the specified return status",
        });
      }

      return res.status(200).json({
        message: "Orders with specified return status fetched successfully",
        data: orders,
      });
    } else {
      return res.status(400).json({ message: "Invalid return status" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Search seller orders by return status and orderId as string match
export const searchSellerOrdersByReturnStatus = async (req, res) => {
  try {
    const userId = req.user.id; // Seller ID from authenticated user
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
      // Search by returnStatus and orderId as string match
      const searchResults = await Order.find({
        _id: searchResult, // Direct match for order ID
        returnStatus: status || "eligible", // Default status if not provided
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
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
