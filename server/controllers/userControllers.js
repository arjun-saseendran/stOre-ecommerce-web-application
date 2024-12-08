import { User } from "../models/userModel.js";
import { passwordHandler } from "../utils/passowordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";

// User signup
export const userSignup = async (req, res) => {
  try {
    // Destructing data from request body
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
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
    const hashedPassword = await passwordHandler(password);

    // Creating new user object
    const newUser = new User({ name, email, mobile, password: hashedPassword });

    // Save new user to database
    await newUser.save();

    // Exclude password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.json({
      message: "User created successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// User login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking fields
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Checking user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not exist" });
    }

    // Checking password
    const matchedPassword = await passwordHandler(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Checking user profile
    if (!user.isActive) {
      return res.status(400).json({ error: "User profile deactivated" });
    }

    // Generating token
    const token = generateToken(user, "user");

    // Set token to cookie
    res.cookie("token", token);

    // Exclude password
    const { password: _, ...userWithoutPassword } = user.toObject();

    res
      .status(200)
      .json({ message: "Login successfull", data: userWithoutPassword });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// User profile details
export const userProfile = async (req, res) => {
  try {
    // Get user id
    const { id } = req.user;

    const userProfileData = await User.findById(id).select("-password");

    res
      .status(200)
      .json({ message: "user profile details fetched", data: userProfileData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// User logout
export const userLogout = async (req, res) => {
  // clearing token from cookies
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "User logout success" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// Update user profile details
export const updateUserProfile = async (req, res) => {
  try {
    // Get user id
    const { id } = req.user;

    // Update user data
    const updatedUserData = await User.findByIdAndUpdate(id, req.body).select(
      "-password"
    );

    res
      .status(200)
      .json({ message: "user profile details updated", data: updatedUserData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// Checking user
export const checkUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Autherized user" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    // Get user id
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { isActive: false });
    res.status(202).json({ message: "User deactivated" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
