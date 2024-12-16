import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";

// Config store
export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});
