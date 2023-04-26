import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
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
    openGlobalLoadingAndErrorAndAbort: (state) => {
      state.globalLoading = true;
      state.globalError = true;
      state.globalAbort = true;
    },
    closeGlobalLoadingAndErrorAndAbort: (state) => {
      state.globalLoading = false;
      state.globalError = false;
      state.globalAbort = false;
    },
    openGlobalLoadingAndAbort: (state) => {
      state.globalLoading = true;
      state.globalAbort = true;
    },
    closeGlobalLoadingAndAbort: (state) => {
      state.globalLoading = false;
      state.globalAbort = false;
    },
    openGlobalLoadingAndError: (state) => {
      state.globalLoading = true;
      state.globalError = true;
    },
    closeGlobalLoadingAndError: (state) => {
      state.globalLoading = false;
      state.globalError = false;
    },
    openGlobalErrorAndAbort: (state) => {
      state.globalError = true;
      state.globalAbort = true;
    },
    closeGlobalErrorAndAbort: (state) => {
      state.globalError = false;
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
  openGlobalLoadingAndErrorAndAbort,
  closeGlobalLoadingAndErrorAndAbort,
} = commonSlice.actions;
export default commonSlice.reducer;
