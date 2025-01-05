import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      miniLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      unique: true,
      required: true,
    },

    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      postal_code: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    password: {
      type: String,
      required: true,
      miniLength: 4,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpires: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
