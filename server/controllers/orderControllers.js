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

    // Handle no status found
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

    // Handle seller id not found
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
// Get seller orders by status
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

    // Send response to frontend
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

    // Send response to frontend
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
    // Get uer id from request user
    const userId = req.user.id;

    // Find the most recent order for the user and populate product details
    const order = await Order.findOne({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("products.productId");

    // Handle order not found
    if (!order) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Update stock for each product in the order
    await Promise.all(
      order.products.map(async (item) => {
        const product = item.productId;
        if (product) {
          // Decrease stock quantity and manage stock quantity not to be zero
          product.stock = Math.max(0, product.stock - item.quantity);
          await product.save();
        }
      })
    );
    // Send response to frontend
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

    // Store product ids
    const productIds = products.map((product) => product._id);

    // Find all orders containing products
    const orders = await Order.find({
      "products.productId": { $in: productIds },
    })
      // Populate category field from product
      .populate("products.productId", "title price image category")

      // Select product fields
      .select("products orderStatus totalPrice createdAt");

    // Handle order not found
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

        // Calculate total price for the category
        const totalProductPrice = price * quantity;

        // Calculate the total price per category
        if (categoryTotalPrice[category]) {
          categoryTotalPrice[category] += totalProductPrice;
        } else {
          categoryTotalPrice[category] = totalProductPrice;
        }
      });
    });

    // Format the data
    const formattedCategoryTotalPrice = Object.keys(categoryTotalPrice).map(
      (category) => ({
        category,
        totalPrice: categoryTotalPrice[category],
      })
    );

    // Send response to the frontend
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

    // Store seller product ids
    const productIds = sellerProducts.map((product) => product._id);

    // Find seller orders
    const orders = await Order.find({
      "products.productId": { $in: productIds },
    })
      // Populate category, title, price, and image from product
      .populate("products.productId", "title price image category")

      // Select product fields
      .select("products totalPrice orderStatus createdAt");

    // Handle order not found
    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller" });
    }

    // Create new object to store category based total price data
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

        // Calculate total price by category
        if (categoryTotalPrice[category]) {
          categoryTotalPrice[category] += totalProductPrice;
        } else {
          categoryTotalPrice[category] = totalProductPrice;
        }
      });
    });

    // Format the data
    const formattedCategoryTotalPrice = Object.keys(categoryTotalPrice).map(
      (category) => ({
        category,
        totalPrice: categoryTotalPrice[category],
      })
    );

    // Send response to frontend
    res.status(200).json({
      message: "Seller orders by category total price fetched successfully",
      data: formattedCategoryTotalPrice,
    });
  } catch (error) {
    // Handle error
    catchErrorHandler(res, error);
  }
};

// Search orders by orderId
export const searchOrders = async (req, res) => {
  try {
    const { searchResult, status } = req.body;

    // Trim search query
    if (searchResult && searchResult.trim() !== "") {
      // Search by orderStatus and orderId
      const searchResults = await Order.find({
        orderStatus: status,
        _id: searchResult,
      });

      // Handle search query not found
      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching orders found" });
      }

      // Send response to frontend
      return res.status(200).json({
        message: "Orders fetched successfully",
        data: searchResults,
      });
    } else {
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search seller orders by status and orderId
export const searchSellerOrders = async (req, res) => {
  try {
    // Get user id from request user
    const userId = req.user.id;

    // Get data from request body
    const { searchResult, status } = req.body;

    // Handle user id not found
    if (!userId) {
      return res.status(400).json({ message: "Seller not found" });
    }

    // Find all product IDs associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle seller product not found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    // Store seller products ids
    const productIds = sellerProducts.map((product) => product._id);

    // Handle search query
    if (searchResult && searchResult.trim() !== "") {
      // Search by orderStatus and  orderId
      const searchResults = await Order.find({
        _id: searchResult,
        orderStatus: status,
        "products.productId": { $in: productIds },

        // Populate data
      }).populate("products.productId", "title price image");

      // Handle search query not found
      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching orders found" });
      }

      // Send response to frontend
      return res.status(200).json({
        message: "Orders fetched successfully",
        data: searchResults,
      });
    } else {
      // Handle invalid input
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
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

    // Find orders with return status
    const orders = await Order.find({
      returnStatus: status || "eligible",
      // Populate data
    }).populate("products.productId");

    // Handle no matching orders found
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the specified return status" });
    }

    // Send response to fronted
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

    // Handle user id not found
    if (!userId) {
      return res.status(400).json({ message: "Seller not found" });
    }

    // Find all products associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle no products found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    // Save seller products ids
    const productIds = sellerProducts.map((product) => product._id);

    // Get return status from request body
    const { status } = req.body;

    // Find all orders with return status for the seller's products
    const orders = await Order.find({
      "products.productId": { $in: productIds },
      returnStatus: status || "eligible",
      // Populate data
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
      // Populate the data
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
    // Get order id from url
    const { orderId } = req.params;

    // Get the order details by orderId
    const order = await Order.findById(orderId).populate(
      "products.productId",
      "title image price"
    );

    // Handle case where no order is found
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    // Get return details
    const returnDetails = {
      returnApprovalStatus: order.returnApprovalStatus,
      returnReason: order.returnReason || "No reason provided",
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
      products: order.products,
    };

    // Send response to frontend
    res.status(200).json({
      message: "Return details fetched successfully!",
      data: returnDetails,
    });
  } catch (error) {
    // Handle catch
    catchErrorHandler(res, error);
  }
};

// Get seller return requests
export const getSellerReturnRequests = async (req, res) => {
  try {
    // Get seller id from request user
    const userId = req.user.id;

    // Handle user id not found
    if (!userId) {
      return res.status(400).json({ message: "Seller not found" });
    }

    // Find all products associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle no product found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    // Save seller product ids
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

// Get seller return details
export const getSellerReturnDetails = async (req, res) => {
  try {
    // Get seller id from request user
    const userId = req.user.id;

    // Get order id from url
    const { orderId } = req.params;

    // Find the order and populate details
    const order = await Order.findById(orderId).populate(
      "products.productId",
      "title image price seller"
    );

    // Handle order not found
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    // Find the seller products
    const sellerProducts = order.products.filter(
      (product) => product.productId.seller.toString() === userId.toString()
    );

    // Handle no products found
    if (!sellerProducts.length) {
      return res.status(400).json({ message: "No seller product found" });
    }

    // Get return details
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
    // Handle catch error
    catchErrorHandler(res, error);
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

// Search return requests by  orderId
export const searchReturnRequests = async (req, res) => {
  try {
    const { searchResult, status } = req.body;

    // Handle data
    if (searchResult && searchResult.trim() !== "") {
      // Search by returnApprovalStatus and orderId match
      const searchResults = await Order.find({
        returnApprovalStatus: status,
        _id: searchResult,
      }).populate("products.productId", "title price image");

      // Handle not search result found
      if (!searchResults || searchResults.length === 0) {
        return res
          .status(404)
          .json({ message: "No matching return requests found" });
      }
      // Send response to frontend
      return res.status(200).json({
        message: "Return requests fetched successfully",
        data: searchResults,
      });
    } else {
      // Handle invalid input
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search seller return requests by status and orderId
export const searchSellerReturnRequests = async (req, res) => {
  try {
    // Get seller id from request user
    const userId = req.user.id;

    // Get data from request body
    const { searchResult, status } = req.body;

    // Handle user id not found
    if (!userId) {
      return res.status(400).json({ message: "Seller not found" });
    }

    // Find all product ids associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle seller products not found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    // Save seller product ids
    const productIds = sellerProducts.map((product) => product._id);

    // Handle data
    if (searchResult && searchResult.trim() !== "") {
      // Search by returnApprovalStatus and orderId
      const searchResults = await Order.find({
        _id: searchResult, // Direct match for order ID
        returnApprovalStatus: status,
        "products.productId": { $in: productIds },

        // Populate data
      }).populate("products.productId", "title price image");

      // Handle search query not found
      if (!searchResults || searchResults.length === 0) {
        return res
          .status(404)
          .json({ message: "No matching return requests found" });
      }

      // Send response to frontend
      return res.status(200).json({
        message: "Return requests fetched successfully",
        data: searchResults,
      });
    } else {
      // Handle invalid input
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search orders by return status
export const searchOrdersByReturnStatus = async (req, res) => {
  try {
    // Get data from request body
    const { status, searchResult } = req.body;

    // Handle data
    if (status && status.trim() !== "") {
      // Check  search query
      const searchQuery =
        searchResult && searchResult.trim() !== "" ? { _id: searchResult } : {};

      // Find all orders with returnStatus
      const orders = await Order.find({
        ...searchQuery,
        returnStatus: status || "eligible",
        // Populate data
      }).populate("products.productId", "title price image");

      // Handle order not found
      if (!orders.length) {
        return res.status(404).json({
          message: "No orders found with the specified return status",
        });
      }

      // Send response to frontend
      return res.status(200).json({
        message: "Orders with specified return status fetched successfully",
        data: orders,
      });
    } else {
      // Handle invalid input
      return res.status(400).json({ message: "Invalid return status" });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search seller orders by return status and orderId
export const searchSellerOrdersByReturnStatus = async (req, res) => {
  try {
    // Get user id from request body
    const userId = req.user.id;

    // Get data from request body
    const { searchResult, status } = req.body;

    // Handle user id not found
    if (!userId) {
      return res.status(400).json({ message: "Seller not found" });
    }

    // Find all product ids associated with the seller
    const sellerProducts = await Product.find({ seller: userId }).select("_id");

    // Handle seller products not found
    if (!sellerProducts.length) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
    }

    // Save seller products ids
    const productIds = sellerProducts.map((product) => product._id);

    // Handle data
    if (searchResult && searchResult.trim() !== "") {
      // Search by returnStatus and orderId as string match
      const searchResults = await Order.find({
        _id: searchResult,
        returnStatus: status || "eligible",
        "products.productId": { $in: productIds },
        // Populate data
      }).populate("products.productId", "title price image");

      // Handle search query not found
      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching orders found" });
      }

      // Send response to frontend
      return res.status(200).json({
        message: "Orders fetched successfully",
        data: searchResults,
      });
    } else {
      // Handle invalid input
      return res.status(400).json({ message: "Invalid search input" });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
