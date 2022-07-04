import { configureStore } from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper"
import contentReducer from "./slices/contentSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      contents: contentReducer,
    },
    devTools: true,
  });
 export const wrapper = createWrapper(makeStore)

