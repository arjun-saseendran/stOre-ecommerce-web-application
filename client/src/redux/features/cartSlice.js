import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  cartData: null,
  cartQuantity: 0,
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload;
      state.cartQuantity = action.payload.products?.length || 0;
    },

    updateTotalPrice: (state, action) => {
      if (state.cart) {
        state.cartData.totalPrice = action.payload;
      }
    },
  },
});

export const { setCart, updateTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
