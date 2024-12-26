import { Schema, model } from "mongoose";

const bannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },

    color: {
      type: String,
      enum: ["black", "yellow"],
      required: true,
      maxLength: 10,
    },

    image: {
      type: String,
      default: "",
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
  },
  { timestamps: true }
);

export const Banner = model("Banner", bannerSchema);
