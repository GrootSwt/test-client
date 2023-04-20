import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    globalLoading: false,
    globalError: false,
    globalAbort: false,
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
    openGlobalAbort: (state) => {
      state.globalAbort = true;
    },
    closeGlobalAbort: (state) => {
      state.globalAbort = false;
    },
  },
});

export const {
  openGlobalLoading,
  closeGlobalLoading,
  openGlobalError,
  closeGlobalError,
  openGlobalAbort,
  closeGlobalAbort,
} = globalSlice.actions;
export default globalSlice.reducer;
