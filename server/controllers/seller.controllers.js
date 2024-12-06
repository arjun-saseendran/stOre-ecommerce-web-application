import { Seller } from "../models/seller.model.js";
import { passwordHandler } from "../utils/passowordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";

// seller signup
const sellerSignup = async (req, res) => {
  try {
    // destructing data from request body
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    // checking seller exists or not
    const sellerExist = await Seller.findOne({ email });
    if (sellerExist) {
      return res
        .status(400)
        .json({ message: "Seller already exist" })
        .select("-password");
    }
    // hashing password
    const hashedPassword = await passwordHandler(password);

    // creating new seller object
    const newSeller = new Seller({ name, email, password: hashedPassword });

    // save new seller to database
    await newSeller.save();

    res.json({ message: "Seller created succfully", data: newSeller });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// seller login
const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking fields
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // checking seller
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({ error: "Seller not exist" });
    }

    // checking password
    const matchedPassword = await passwordHandler(password, seller.password);

    if (!matchedPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // checking seller profile
    if (!seller.isActive) {
      return res.status(400).json({ error: "Seller profile deactivated" });
    }

    // generating token
    const token = generateToken(seller, "seller");

    // set token to cookie
    res.cookie("token", token);

    // exclude password
    const { password: _, ...sellerWithoutPassword } = seller.toObject();

    res
      .status(200)
      .json({ message: "Login successfull", data: sellerWithoutPassword });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// seller profile details
const sellerProfile = async (req, res) => {
  try {
    // fetching sellerId
    // const { sellerId } = req.seller.id;
    const sellerProfileData = await seller.findById(req.seller.id).select(
      "-password"
    );

    res
      .status(200)
      .json({ message: "seller profile details fetched", data: sellerProfileData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// seller logout
const sellerLogout = async (req, res) => {
  // clearing token from cookies
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "seller logout success" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// update seller profile details
const updatesellerProfile = async (req, res) => {
  try {
    // fetching sellerId
    // const { sellerId } = req.seller.id;

    // update seller data
    const updatedsellerData = await seller.findByIdAndUpdate(
      req.seller.id,
      req.body
    ).select("-password");

    res
      .status(200)
      .json({ message: "seller profile details updated", data: updatedsellerData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// checking seller
const checkseller = async (req, res) => {
  try {
    res.status(200).json({ message: "Autherized seller" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const deactivateseller = async (req, res) => {
  try {
    await seller.findByIdAndUpdate(req.seller.id, { isActive: false });
    res.status(202).json({ message: "seller deactivated" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export {
  sellerSignup,
  sellerLogin,
  sellerProfile,
  sellerLogout,
  updatesellerProfile,
  checkseller,
  deactivateseller,
};
