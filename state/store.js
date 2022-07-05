import { configureStore } from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper"
import authReducer from "./estateSlices/authSlices";
import allListingReducer from "./estateSlices/allListingSlices";
import contentReducer from "./estateSlices/contentSlice";

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
// export const store = (preloadedState) => {
//   configureStore({
//     reducer: {
//       auth: authReducer,
//       listings: allListingReducer,
//       contents: contentReducer,
//     },
//     preloadedState,
//   });
// };
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     listings: allListingReducer,
//     contents: contentReducer,
//   },
// });
