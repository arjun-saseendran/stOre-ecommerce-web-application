import { User } from "../models/user.model.js";
import { passwordHandler } from "../utils/passowordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";

const userSignup = async (req, res) => {
  try {
    // destructing data from request body
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    // checking user exists or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exist" })
        .select("-password");
    }
    // hashing password
    const hashedPassword = await passwordHandler(password);

    // creating new user object
    const newUser = new User({ name, email, mobile, password: hashedPassword });

    // save new user to database
    await newUser.save();

    res.json({ message: "User created succfully", data: newUser });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking fields
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // checking user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not exist" });
    }

    // checking password
    const matchedPassword = await passwordHandler(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // checking user profile
    if (!user.isActive) {
      return res.status(400).json({ error: "User profile deactivated" });
    }

    // generating token
    const token = generateToken(user, "user");

    // set token to cookie
    res.cookie(token, "token");

    res.status(200).json({ message: "Login successfull", data: user });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// user profile details
const userProfile = async (req, res) => {
  try {
    // fetching userId
    const { userId } = req.user.id;
    const userData = await User.findById(userId).select("-password");
    res
      .status(200)
      .json({ message: "user profile details fetched", data: userData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// user logout
const userLogout = async(req, res) => {

  // clearing token from cookies
  try {
    res.clearCookie('token')
  
    res.status(200).json({message: 'User logout success'})
  } catch (error) {
    res.status(error.status || 500).json({error: error.message || 'Internal server error'})
    
  }
}

// checking user
const checkUser = async(req, res) => {
  try {
    res.status(200).json({message: 'Autherized user'})
  } catch (error) {
    res.status(error.status || 500).json({error: error.message || 'Internal server error'})
  }
}


export { userSignup, userLogin, userProfile, userLogout, checkUser };
