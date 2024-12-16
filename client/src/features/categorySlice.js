import { createSlice } from "@reduxjs/toolkit";

// Set initial vlaue
const initialState = {
    productByCategory: [],
}

// Create categorySlice
export const categorySlice = createSlice({
name: 'productCategory',
initialState,


})