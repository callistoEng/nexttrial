import { configureStore } from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper"
import authReducer from "./estateSices/authSlices"; 
import contentReducer from "./estateSices/contentSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      contents: contentReducer,
    },
    devTools: true,
  });
 export const wrapper = createWrapper(makeStore)

