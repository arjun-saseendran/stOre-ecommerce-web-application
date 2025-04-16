import { createSlice } from "@reduxjs/toolkit";

// Create admin slice
export const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    saveAdminData: (_, action) => action.payload,
    clearAdminData: () => null,
  },
});

export const { saveAdminData, clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
