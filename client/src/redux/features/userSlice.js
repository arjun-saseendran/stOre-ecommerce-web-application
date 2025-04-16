import { createSlice } from "@reduxjs/toolkit";

// Create user slice
export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    saveUserData: (_, action) => action.payload,
    clearUserData: () => null,
  },
});

export const { saveUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
