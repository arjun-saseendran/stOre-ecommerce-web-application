import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
