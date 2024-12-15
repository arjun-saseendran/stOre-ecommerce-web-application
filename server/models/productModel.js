import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
    },
    description: {
      type: String,
      required: true,
      miniLength: 20,
      maxLength: 300,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
