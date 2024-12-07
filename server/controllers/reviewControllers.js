import { Review } from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";

export const reviewIncrement = async () => {
  try {
    const reviewProduct = await Product.findById(req.param.id);
  } catch (error) {}
};
