import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  cart: [],
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set cart products
    addProductToCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {addProductToCart} = cartSlice.actions
export default cartSlice.reducer
