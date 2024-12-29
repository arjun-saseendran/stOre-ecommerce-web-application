import crypto from "crypto";
import passwordHandler from "../utils/passwordHandler.js";
import { User } from "../models/userModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Config nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    user.resetTokenExpires = Date.now() + 10000;

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
  const { token, newPassword } = req.body;

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
