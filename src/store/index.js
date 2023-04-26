import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./features/commonSlice";

export default configureStore({
  reducer: {
    common: commonReducer,
  },
});
