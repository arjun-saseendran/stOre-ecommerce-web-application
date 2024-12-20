import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";
import roleReducer from "./features/roleSlice";
import searchReducer from './features/searchSlice'
import cartReducer from './features/cartSlice'
import productReducer from './features/productSlice'
import homeReducer from './features/homeSlice'
import themeReducer from './features/themeSlice'
import userReducer  from './features/userSlice'
import sellerReducer  from './features/sellerSlice'

// Config store
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    role: roleReducer,
    search: searchReducer,
    cart: cartReducer,
    products: productReducer,
    home: homeReducer,
    theme: themeReducer,
    user: userReducer,
    seller: sellerReducer
  },
});
