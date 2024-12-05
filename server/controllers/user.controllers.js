import { User } from "../models/user.model.js";
import { passwordHandler } from "../utils/passowordHandler.js";

const signup = async (req, res) => {
  try {
    // destructing data from request body
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    // checking user exists or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    // hashing password
    const hashedPassword = passwordHandler(password);

    // creating new user object
    const newUser = new User({ name, email, mobile, hashedPassword });

    // save new user to database
    await newUser.save();

    res.json({ message: "User created succfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export { signup };
