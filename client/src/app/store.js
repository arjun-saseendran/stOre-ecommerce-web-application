import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import roleReducer from "../features/roleSlice";

// Config store
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    role: roleReducer,
  },
});
