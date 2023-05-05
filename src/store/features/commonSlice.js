import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    enableGlobalLoading: false,
    enableDefaultErrorHandler: false,
    enableAbortRequest: false,
  },
  reducers: {
    openGlobalLoading: (state) => {
      state.enableGlobalLoading = true;
    },
    closeGlobalLoading: (state) => {
      state.enableGlobalLoading = false;
    },
    openDefaultErrorHandler: (state) => {
      state.enableDefaultErrorHandler = true;
    },
    closeDefaultErrorHandler: (state) => {
      state.enableDefaultErrorHandler = false;
    },
    openEnableAbortRequest: (state) => {
      state.enableAbortRequest = true;
    },
    closeEnableAbortRequest: (state) => {
      state.enableAbortRequest = false;
    },
    openGlobalLoadingDefaultErrorHandlerAbortRequest: (state) => {
      state.enableGlobalLoading = true;
      state.enableDefaultErrorHandler = true;
      state.enableAbortRequest = true;
    },
    closeGlobalLoadingDefaultErrorHandlerAbortRequest: (state) => {
      state.enableGlobalLoading = false;
      state.enableDefaultErrorHandler = false;
      state.enableAbortRequest = false;
    },
    openGlobalLoadingAndAbortRequest: (state) => {
      state.enableGlobalLoading = true;
      state.enableAbortRequest = true;
    },
    closeGlobalLoadingAndAbortRequest: (state) => {
      state.enableGlobalLoading = false;
      state.enableAbortRequest = false;
    },
    openGlobalLoadingDefaultErrorHandler: (state) => {
      state.enableGlobalLoading = true;
      state.enableDefaultErrorHandler = true;
    },
    closeGlobalLoadingAndDefaultErrorHandler: (state) => {
      state.enableGlobalLoading = false;
      state.enableDefaultErrorHandler = false;
    },
    openDefaultErrorHandlerAbortRequest: (state) => {
      state.enableDefaultErrorHandler = true;
      state.enableAbortRequest = true;
    },
    closeDefaultErrorHandlerAbortRequest: (state) => {
      state.enableDefaultErrorHandler = false;
      state.enableAbortRequest = false;
    },
  },
});

export const {
  openGlobalLoading,
  closeGlobalLoading,
  openDefaultErrorHandler,
  closeDefaultErrorHandler,
  openEnableAbortRequest,
  closeEnableAbortRequest,
  openGlobalLoadingDefaultErrorHandlerAbortRequest,
  closeGlobalLoadingDefaultErrorHandlerAbortRequest,
} = commonSlice.actions;
export default commonSlice.reducer;
