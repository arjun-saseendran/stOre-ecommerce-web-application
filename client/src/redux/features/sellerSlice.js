import { createSlice } from "@reduxjs/toolkit";

// Create seller slice
export const sellerSlice = createSlice({
  name: "seller",
  initialState: null,
  reducers: {
    saveSellerData: (_, action) => action.payload,
    clearSellerData: () => null,
  },
});

export const { saveSellerData, clearSellerData } = sellerSlice.actions;
export default sellerSlice.reducer;
