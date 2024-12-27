import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  cartData: [],
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload;
    },
    addQuantity: (state, action) => {
      state.cartData.push(action.payload)
    },
    removeQuantity: (state, action) => {
      state.cartData.push(action.payload)
    }

  }  
});

export const { setCart, addQuantity, removeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
