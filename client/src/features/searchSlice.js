import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  search: "",
};

// Create search slice
const searchSlice = createSlice({
  name: "search",
  initialState,

  // Set search result
  reducers: {
    setSearchValue: (state, action) => {
      // Add serach value
      state.search = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
