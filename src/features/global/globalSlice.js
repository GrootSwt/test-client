import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    globalLoading: false,
    globalError: false,
  },
  reducers: {
    openGlobalLoading: (state) => {
      state.globalLoading = true;
    },
    closeGlobalLoading: (state) => {
      state.globalLoading = false;
    },
    openGlobalError: (state) => {
      state.globalError = true;
    },
    closeGlobalError: (state) => {
      state.globalError = false;
    },
  },
});

export const {
  openGlobalLoading,
  closeGlobalLoading,
  openGlobalError,
  closeGlobalError,
} = globalSlice.actions;
export default globalSlice.reducer;
