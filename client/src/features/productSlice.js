import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  products: [],
};

// Create product slice
const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
