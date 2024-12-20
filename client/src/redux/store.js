import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";
import searchReducer from "./features/searchSlice";
import themeReducer from "./features/themeSlice";
import userReducer from "./features/userSlice";
import sellerReducer from "./features/sellerSlice";

// Config store
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    search: searchReducer,
    theme: themeReducer,
    user: userReducer,
    seller: sellerReducer,
  },
});
