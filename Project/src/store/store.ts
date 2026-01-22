import { configureStore } from "@reduxjs/toolkit";
import aythReducer from "./AuthSlice";
import errorReducer from "./ErrorSlice";

export const store = configureStore({
  reducer: {
    auth: aythReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
