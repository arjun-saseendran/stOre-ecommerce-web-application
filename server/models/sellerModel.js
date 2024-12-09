import { Schema, model } from "mongoose";

const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      miniLength: 6,
    },
    role: {
      type: String,
      enum: ["seller", "admin"],
      default: "seller",
    },
    isActive: {
      type: Boolean,
      default: true
    },
    profilePicture: {
      type: String,
      default:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const Seller = model("Seller", sellerSchema);
