import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  cartQuantity: 0,
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCartQuantity: (state, action) => {
      state.cartQuantity = action.payload;
    },
  },
});

export const { saveCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
