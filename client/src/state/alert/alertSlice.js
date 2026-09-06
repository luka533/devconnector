import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return [...state, action.payload];
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
