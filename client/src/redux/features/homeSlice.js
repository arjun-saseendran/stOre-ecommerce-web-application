import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  home: false
};

// Create home slice
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // Set cart products
    setHome: (state, action) => {
      state.home = action.payload
    },
  },
});

export const { setHome} = homeSlice.actions;
export default homeSlice.reducer;
