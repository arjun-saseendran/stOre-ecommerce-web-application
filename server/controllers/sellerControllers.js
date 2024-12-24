import { Seller } from "../models/sellerModel.js";
import { passwordHandler } from "../utils/passowordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// Seller signup
export const sellerSignup = async (req, res) => {
  try {
    // Destructing data from request body
    const { name, email, password, mobile, confirmPassword } = req.body;
    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check password and confirm password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm passwrod not match" });
    }

    // Checking seller exists or not
    const sellerExist = await Seller.findOne({ email });
    if (sellerExist) {
      return res
        .status(400)
        .json({ message: "Seller already exist" })
        .select("-password");
    }
    // Hashing password
    const hashedPassword = await passwordHandler(password, undefined, res);

    // Handle upload image
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

    res.json({
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

    if (!matchedPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Checking seller profile
    if (!seller.isActive) {
      return res.status(400).json({ message: "Seller profile deactivated" });
    }

    // Generating token and set role
    const token = generateToken(seller, seller.role, res);

    // Set token to cookie
    res.cookie("token", token);

    // Exclude password
    const { password: _, ...sellerWithoutPassword } = seller.toObject();

    res
      .status(200)
      .json({ message: "Login successfull", data: sellerWithoutPassword });
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

// Display all sellers
export const getSellers = async (req, res) => {
  try {
    // Get all sellers
    const seller = await Seller.find({role: 'seller'});

    res
      .status(200)
      .json({ message: "All sellers fetched successfully", data: seller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};


// Seller logout
export const sellerLogout = async (req, res) => {
  // Clearing token from cookies
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "Seller logout success" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Update seller profile details
export const updatesellerProfile = async (req, res) => {
  try {
    // Get seller id
    const userId = req.user.id;

    // Update seller data
    const updatedSellerData = await Seller.findByIdAndUpdate(
      userId,
      req.body
    ).select("-password");

    res.status(200).json({
      message: "seller profile details updated",
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
    res.status(200).json({ message: "Autherized seller" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

export const deactivateSeller = async (req, res) => {
  try {
    // ger seller id
    const userId = req.user.id;
    await Seller.findByIdAndUpdate(userId, { isActive: false });
    res.status(202).json({ message: "seller deactivated" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Get inactive sellers
export const getInactiveSellers = async (req, res) => {
  try {
    // Get inactvie sellers
    const inactiveSellers = await Seller.find({ isActive: false });

    // Handle not found
    if (!inactiveSellers) {
      return res.status(404).json({ message: "No inactive seller found" });
    }

    res
      .status(200)
      .json({ message: "Inactive sellers fetched", data: inactiveSellers });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Acitvate seller
export const activateSeller = async (req, res) => {
  try {
    // Get user id
    const { userId } = req.body;

    // Get seller
    const inactiveSeller = await Seller.findById(userId);

    // Handle not found
    if (!inactiveSeller) {
      return res.status(404).json({ message: "No inactive seller found" });
    }

    // Acivate seller
    inactiveSeller.isActive = true;

    // Save data
    await inactiveSeller.save();

    res.status(202).json({ message: "Seller activated" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Delete seller
export const deleteSeller = async (req, res) => {
  try {
    // Get seller id
    const sellerId = req.params.id;

    // Get seller
    const destroyedSeller = await Seller.findByIdAndDelete(sellerId);

    res.status(202).json({ message: "Seller deleted", data: destroyedSeller });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Check admin
export const checkAdmin = async (req, res) => {
  try {
    res.status(200).json({ message: "Autherized admin" });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
