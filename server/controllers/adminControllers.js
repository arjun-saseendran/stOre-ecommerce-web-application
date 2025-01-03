import crypto from "crypto";
import nodemailer from "nodemailer";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { generateToken } from "../utils/tokenHandler.js";
import { Seller } from "../models/sellerModel.js";
import { passwordHandler } from "../utils/passwordHandler.js";

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

// admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Checking seller
    let admin = await Seller.findOne({ email, role: "admin" });

    // Admin not found
    if (!admin) {
      return res.status(400).json({ message: "Admin not exist" });
    }

    // Checking password
    const matchedPassword = await passwordHandler(
      password,
      admin.password,
      res
    );

    if (!matchedPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Checking admin profile
    if (!admin.isActive) {
      return res.status(400).json({ message: "Admin profile deactivated" });
    }

    // Generating token and set role
    const token = generateToken(admin, "admin", res);

    // Set token to cookie
    res.cookie("token", token, {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: NODE_ENV === "production",
    });

    // Exclude password
    const { password: _, ...adminWithoutPassword } = admin.toObject();

    res
      .status(200)
      .json({ message: "Login successful", data: adminWithoutPassword });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Admin profile details
export const adminProfile = async (req, res) => {
  try {
    // Get seller id
    const userId = req.user.id;
    const profile = await Seller.findById(userId).select("-password");

    res.status(200).json({
      message: "Admin profile details fetched",
      data: profile,
    });
  } catch (error) {
    res;
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Update admin profile details
export const updateAdminProfile = async (req, res) => {
  try {
    // Destructure request body
    const { name, email, mobile } = req.body;

    // Check if name, email, or mobile are missing
    if (!name || !email || !mobile) {
      return res
        .status(400)
        .json({ message: "Name, email, and mobile are required" });
    }
    // Get user id
    const userId = req.user.id;

    // Handle upload image
    let profilePictureUrl = null;

    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(
        req.file.path
      );
      profilePictureUrl = uploadResult.url;
    }

    // Update admin data
    const updatedAdminData = await Seller.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        mobile,
        profilePicture: profilePictureUrl || undefined,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Admin profile details updated",
      data: updatedAdminData,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Forgot password
export const adminForgotPassword = async (req, res) => {
  // Get admin email from body
  const { email } = req.body;
  try {
    // Find admin found
    const admin = await Seller.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Assign to database variable
    admin.resetToken = resetToken;

    // Set token expires
    admin.resetTokenExpires = Date.now() + 10 * 60 * 1000;

    // Save to database
    await admin.save();

    // Set rest link
    const resetLink = `${process.env.CORS}/admin/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: "Reset email send!" });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Reset password
export const adminResetPassword = async (req, res) => {
  // Get data from request body
  const { password } = req.body;

  const { token } = req.params;

  try {
    // Find the admin
    const admin = await Seller.findOne({
      resetToken: token,
      role: "admin",
      resetTokenExpires: { $gt: Date.now() },
    });

    // Handle admin not found
    if (!token) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired!" });
    }

    // Hashing password
    admin.password = await passwordHandler(password, undefined, res);

    // Clear tokens
    admin.resetToken = null;
    admin.resetTokenExpires = null;

    // Save admin data
    await admin.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Admin details
export const adminDetails = async (req, res) => {
  try {
    // Get admin id
    const { userId } = req.params;
    const admin = await Seller.findById(userId);

    res.status(200).json({ message: "Admin details fetched", data: admin });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Admin logout
export const adminLogout = async (req, res) => {
  // Clearing token from cookies
  try {
    res.clearCookie("token", {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: NODE_ENV === "production",
    });

    res.status(200).json({ message: "Admin logout success" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Check admin
export const checkAdmin = async (req, res) => {
  try {
    res.status(200).json({ message: "Authorized admin" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
