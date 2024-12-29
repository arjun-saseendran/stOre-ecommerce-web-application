import crypto from "crypto";
import nodemailer from "nodemailer";
import { User } from "../models/userModel.js";
import { passwordHandler } from "../utils/passwordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

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

// User signup
export const userSignup = async (req, res) => {
  try {
    // Destructing data from request body
    const { name, email, mobile, password, confirmPassword } = req.body;
    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check password and confirm password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm password not match" });
    }

    // Checking user exists or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exist" })
        .select("-password");
    }
    // Hashing password
    const hashedPassword = await passwordHandler(password, undefined, res);

    // Handle upload image
    const uploadResult = await cloudinaryInstance.uploader.upload(
      req.file.path
    );

    // Creating new user object
    const newUser = new User({
      name,
      email,
      mobile,
      profilePicture: uploadResult.url,
      password: hashedPassword,
    });

    // Save new user to database
    await newUser.save();

    // Exclude password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.json({
      message: "User created successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// User login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Checking user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }

    // Checking password
    const matchedPassword = await passwordHandler(password, user.password, res);

    if (!matchedPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Checking user profile
    if (!user.isActive) {
      return res.status(400).json({ message: "User profile deactivated" });
    }

    // Generating token
    const token = generateToken(user, "user", res);

    // Set token to cookie
    res.cookie("token", token, {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: NODE_ENV === "production",
    });

    // Exclude password
    const { password: _, ...userWithoutPassword } = user.toObject();

    res
      .status(200)
      .json({ message: "Login successful", data: userWithoutPassword });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Display all users
export const getUsers = async (req, res) => {
  try {
    // Get all users
    const users = await User.find();

    res
      .status(200)
      .json({ message: "All users fetched successfully", data: users });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// User profile details
export const userProfile = async (req, res) => {
  try {
    // Get user id
    const { id } = req.user;

    const profile = await User.findById(id).select("-password");

    res
      .status(200)
      .json({ message: "user profile details fetched", data: profile });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// User logout
export const userLogout = async (req, res) => {
  // Clearing token from cookies
  try {
    res.clearCookie("token", {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: NODE_ENV === "production",
    });

    res.status(200).json({ message: "User logout success" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Update user profile details
export const updateUserProfile = async (req, res) => {
  console.log(req.body);

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

    // Update user data
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        mobile,
        profilePicture: profilePictureUrl || undefined,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "user profile details updated", data: updatedUserData });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Checking user
export const checkUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Authorized user" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get inactive users
export const getInactiveUsers = async (req, res) => {
  try {
    // Get inactive users
    const inactiveUsers = await User.find({ isActive: false });

    // Handle not found
    if (!inactiveUsers) {
      return res.status(404).json({ message: "No inactive user found" });
    }

    res
      .status(200)
      .json({ message: "Inactive users fetched", data: inactiveUsers });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

export const deactivateUser = async (req, res) => {
  try {
    // Get user id
    const { userId } = req.body;

    // Get user
    const user = await User.findById(userId);

    // Handle not found
    if (!user) {
      return res.status(404).json({ message: "No such seller found" });
    }

    // Deactivate user
    user.isActive = false;

    // Save data
    await user.save();

    res.status(202).json({ message: "User deactivated", data: user });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Activate user
export const activateUser = async (req, res) => {
  try {
    // Get user id
    const { userId } = req.body;

    // Get user
    const inactiveUser = await User.findById(userId);

    // Handle not found
    if (!inactiveUser) {
      return res.status(404).json({ message: "No inactive user found" });
    }

    // Activate user
    inactiveUser.isActive = true;

    // Save data
    await inactiveUser.save();

    res.status(202).json({ message: "User activated" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    // Get user id
    const { userId } = req.body;

    // Get user
    const user = await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted", data: user });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get active users
export const getActiveUsers = async (req, res) => {
  try {
    // Get active users
    const activeUsers = await User.find({ isActive: true });

    // Handle not found
    if (!activeUsers) {
      return res.status(404).json({ message: "No active users found" });
    }

    res
      .status(200)
      .json({ message: "Active Users fetched", data: activeUsers });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  // Get user email from body
  const { email } = req.body;
  try {
    // Find user found
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Assign to database variable
    user.resetToken = resetToken;

    // Set token expires
    user.resetTokenExpires = Date.now() + 5 * 60 * 1000;

    // Save to database
    await user.save();

    // Set rest link
    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;

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
export const resetPassword = async (req, res) => {
  // Get data from request body
  const { password } = req.body;

  const { token } = req.params;

  try {
    // Find the user
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    // Handle user not found
    if (!token) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired!" });
    }

    // Hashing password
    user.password = await passwordHandler(password, undefined, res);

    // Clear tokens
    user.resetToken = null;
    user.resetTokenExpires = null;

    // Save user data
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};
