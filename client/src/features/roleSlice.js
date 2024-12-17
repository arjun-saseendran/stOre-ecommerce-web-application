import { createSlice } from "@reduxjs/toolkit";

// Set initial vlaue
const initialState = {
  role: "",
};

// Create roleSlice
const roleSlice = createSlice({
  name: "role",
  initialState,

  // Set role
  reducers: {
    setRole: (state, action) => {
      //Add data to role state
      state.role = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
