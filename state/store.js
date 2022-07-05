import { configureStore } from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper"
import authReducer from "./estateSlices/authSlices"; 
import contentReducer from "./estateSlices/contentSlice";
import allListingReducer from "./estateSlices/allListingSlices";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      listings: allListingReducer,
      contents: contentReducer,
    },
    devTools: true,
  });
 export const wrapper = createWrapper(makeStore)

