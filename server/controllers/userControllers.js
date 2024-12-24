import { User } from "../models/userModel.js";
import { passwordHandler } from "../utils/passowordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

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
        .json({ message: "Password and Confirm passwrod not match" });
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
    res.cookie("token", token);

    // Exclude password
    const { password: _, ...userWithoutPassword } = user.toObject();

    res
      .status(200)
      .json({ message: "Login successfull", data: userWithoutPassword });
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
    res.clearCookie("token");

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
    res.status(200).json({ message: "Autherized user" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get inactive users
export const getInactiveUsers = async (req, res) => {
  try {
    // Get inactvie users
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
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    res.status(202).json({ message: "User deactivated" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Acitvate user
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

    // Acivate user
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
    const userId = req.params.id;

    // Get user
    const destroyedUser = await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted", data: destroyedUser });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

