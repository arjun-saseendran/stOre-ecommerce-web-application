import { Seller } from "../models/sellerModel.js";
import { passwordHandler } from "../utils/passwordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Config node env
const NODE_ENV = process.env.NODE_ENV;

// Config nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Seller signup
export const sellerSignup = async (req, res) => {
  try {
    // Destructing data from request body
    const { name, email, password, mobile, confirmPassword } = req.body;

    // Handle input field not be empty
    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check password and confirm password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm password not match" });
    }

    // Checking seller exists or not
    const sellerExist = await Seller.findOne({ email });
    if (sellerExist) {
      return res
        .status(400)
        .json({ message: "Seller already exist" })
        .select("-password");
    }

    // Checking mobile number exists or not
    const mobileNumberExist = await Seller.findOne({ mobile }).select(
      "-password"
    );

    if (mobileNumberExist) {
      return res.status(400).json({ message: "Mobile number already exist!" });
    }

    // Hashing password
    const hashedPassword = await passwordHandler(password, undefined, res);

    // Handle profile picture not found
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Profile picture required!" });
    }

    // Upload profile picture to cloudinary
    const uploadResult = await cloudinaryInstance.uploader.upload(
      req.file.path
    );

    // Creating new seller object
    const newSeller = new Seller({
      name,
      email,
      mobile,
      profilePicture: uploadResult.url,
      password: hashedPassword,
    });

    // Save new seller to database
    await newSeller.save();

    // Exclude password
    const { password: _, ...sellerWithoutPassword } = newSeller.toObject();

    // Send response to frontend
    res.status(200).json({
      message: "Seller created successfully",
      data: sellerWithoutPassword,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Seller login
export const sellerLogin = async (req, res) => {
  try {
    // Get data from request body
    const { email, password } = req.body;

    // Checking fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Checking seller
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({ message: "Seller not exist" });
    }

    // Checking password
    const matchedPassword = await passwordHandler(
      password,
      seller.password,
      res
    );

    // Handle password does not match
    if (!matchedPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Checking seller profile
    if (!seller.isActive) {
      return res.status(400).json({ message: "Seller profile deactivated" });
    }

    // Generating token and set role
    const token = generateToken(seller, "seller", res);

    // Set token
    // res.cookie("token", token, {
    //   expires: new Date(Date.now() + 8 * 3600000),
    // });

    res.cookie("token", token, {
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
    });

    // Exclude password
    const { password: _, ...sellerWithoutPassword } = seller.toObject();

    res.status(200).json({
      message: "Login successful",
      data: sellerWithoutPassword,
      token,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Seller profile details
export const sellerProfile = async (req, res) => {
  try {
    // Get seller id
    const userId = req.user.id;
    const profile = await Seller.findById(userId).select("-password");

    // Send response to frontend
    res.status(200).json({
      message: "Seller profile details fetched",
      data: profile,
    });
  } catch (error) {
    res;
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Seller details
export const sellerDetails = async (req, res) => {
  try {
    // Get seller id
    const { userId } = req.params;

    // Find seller
    const seller = await Seller.findById(userId);

    // Send response to frontend
    res.status(200).json({ message: "Seller details fetched", data: seller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Display all sellers
export const getSellers = async (req, res) => {
  try {
    // Get all sellers
    const seller = await Seller.find({ role: "seller" });

    // Send response to frontend
    res
      .status(200)
      .json({ message: "All sellers fetched successfully", data: seller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

export const sellerLogout = async (req, res) => {
  // Clearing token from cookies
  try {
    // Clear token
    // res.cookie("token", null, {
    //   expires: new Date(Date.now()),
    // });

    res.clearCookie("token", {
      sameSite: "None",
      secure: true,
      httpOnly: true,
  });

    // Send response to frontend
    res.status(200).json({ message: "Seller logout success" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Update seller profile details
export const updateSellerProfile = async (req, res) => {
  try {
    // Get data from request body
    const { name, email, mobile } = req.body;

    // Handle field not to be empty
    if (!name || !email || !mobile) {
      return res
        .status(400)
        .json({ message: "Name, email, and mobile are required" });
    }
    // Get user id
    const userId = req.user.id;

    // Handle upload image
    let profilePictureUrl = null;

    // Upload data to cloudinary
    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(
        req.file.path
      );
      profilePictureUrl = uploadResult.url;
    }

    // Update admin data
    const updatedSellerData = await Seller.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        mobile,
        profilePicture: profilePictureUrl || undefined,
      },
      { new: true }
    );
    // Send response to frontend
    res.status(200).json({
      message: "Seller profile details updated",
      data: updatedSellerData,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Check seller
export const checkSeller = async (req, res) => {
  try {
    // Check seller
    const userId = req.user.id;

    // Get seller details
    const seller = await Seller.findById(userId);

    // Send response to frontend
    res.status(200).json({ message: "Authorized seller", data: seller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Deactivate seller
export const deactivateSeller = async (req, res) => {
  try {
    // Get user id
    const { userId } = req.body;

    // Get seller
    const seller = await Seller.findById(userId);

    // Handle not found
    if (!seller) {
      return res.status(404).json({ message: "No such seller found" });
    }

    // Deactivate seller
    seller.isActive = false;

    // Save data
    await seller.save();

    // Send response to frontend
    res.status(200).json({ message: "Seller deactivated", data: seller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get inactive sellers
export const getInactiveSellers = async (req, res) => {
  try {
    // Get inactive sellers
    const inactiveSellers = await Seller.find({ isActive: false });

    // Handle not found
    if (!inactiveSellers) {
      return res.status(404).json({ message: "No inactive seller found" });
    }
    // Send response to frontend
    res
      .status(200)
      .json({ message: "Inactive sellers fetched", data: inactiveSellers });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
// Get active sellers
export const getActiveSellers = async (req, res) => {
  try {
    // Get active sellers
    const activeSellers = await Seller.find({ isActive: true });

    // Handle not found
    if (!activeSellers) {
      return res.status(404).json({ message: "No active sellers found" });
    }
    // Send response to frontend
    res
      .status(200)
      .json({ message: "Active sellers fetched", data: activeSellers });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Activate seller
export const activateSeller = async (req, res) => {
  try {
    // Get user id
    const { userId } = req.body;

    // Get seller
    const seller = await Seller.findById(userId);

    // Handle not found
    if (!seller) {
      return res.status(404).json({ message: "No inactive seller found" });
    }

    // Activate seller
    seller.isActive = true;

    // Save data
    await seller.save();

    // Send response to frontend
    res.status(200).json({ message: "Seller activated", data: seller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Delete seller
export const deleteSeller = async (req, res) => {
  try {
    // Get seller id
    const { userId } = req.body;

    // Get seller
    const seller = await Seller.findByIdAndDelete(userId);
    // Send response to frontend
    res
      .status(200)
      .json({ message: "Seller deleted successfully", data: seller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Forgot password
export const sellerForgotPassword = async (req, res) => {
  // Get data request body
  const { email } = req.body;
  try {
    // Find seller found
    const seller = await Seller.findOne({ email });

    // Handle seller not found
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Assign to database variable
    seller.resetToken = resetToken;

    // Set token expires
    seller.resetTokenExpires = Date.now() + 10 * 60 * 1000;

    // Save to database
    await seller.save();

    // Set rest link
    const resetLink = `${process.env.CORS}/seller/reset-password/${resetToken}`;
    // Set up mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset request",
      text: `Click the link to reset your password: ${resetLink}`,
    });
    // Send response to frontend
    res.status(200).json({ message: "Reset email send!" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Reset password
export const sellerResetPassword = async (req, res) => {
  // Get data from request body
  const { password } = req.body;

  // Get token from url
  const { token } = req.params;

  try {
    // Find the seller
    const seller = await Seller.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    // Handle seller not found
    if (!token) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired!" });
    }

    // Hashing password
    seller.password = await passwordHandler(password, undefined, res);

    // Clear tokens
    seller.resetToken = null;
    seller.resetTokenExpires = null;

    // Save seller data
    await seller.save();
    // Send response to frontend
    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search active sellers
export const searchActiveSellers = async (req, res) => {
  try {
    // Get search value
    const { searchResult } = req.body;

    // Check if search value
    if (searchResult && searchResult.trim() !== "") {
      // Search for active sellers
      const activeSellers = await Seller.find({
        isActive: true,
        $or: [
          { name: { $regex: searchResult, $options: "i" } },
          { email: { $regex: searchResult, $options: "i" } },
        ],
      });

      // Handle search query
      if (!activeSellers || activeSellers.length === 0) {
        return res
          .status(404)
          .json({ message: "No matching active sellers found in search" });
      }
      // Send response to frontend
      return res.status(200).json({
        message: "Active sellers found",
        data: activeSellers,
      });
    } else {
      // If no search value, return all active sellers
      const activeSellers = await Seller.find({ isActive: true });

      // Handle data not found
      if (!activeSellers || activeSellers.length === 0) {
        return res
          .status(404)
          .json({ message: "No search active sellers found" });
      }

      // Send response to frontend
      return res.status(200).json({
        message: "No search active sellers fetched successfully",
        data: activeSellers,
      });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Search inactive sellers
export const searchInactiveSellers = async (req, res) => {
  try {
    // Get search value
    const { searchResult } = req.body;

    // Check if search value
    if (searchResult && searchResult.trim() !== "") {
      // Search for inactive sellers by mongodb regular expression
      const inactiveSellers = await Seller.find({
        isActive: false,
        $or: [
          { name: { $regex: searchResult, $options: "i" } },
          { email: { $regex: searchResult, $options: "i" } },
        ],
      });
      // Handle data not found
      if (!inactiveSellers || inactiveSellers.length === 0) {
        return res
          .status(404)
          .json({ message: "No matching inactive sellers found in search" });
      }
      // Send response to frontend
      return res.status(200).json({
        message: "Inactive sellers found",
        data: inactiveSellers,
      });
    } else {
      // If no search value, return all inactive sellers
      const inactiveSellers = await Seller.find({ isActive: false });
      // Handle no data found
      if (!inactiveSellers || inactiveSellers.length === 0) {
        return res
          .status(404)
          .json({ message: "No search inactive sellers found" });
      }

      // Send response to frontend
      return res.status(200).json({
        message: "No search inactive sellers fetched successfully",
        data: inactiveSellers,
      });
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
