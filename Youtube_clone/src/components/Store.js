import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import commentReducer from "./commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentReducer,
  },
});
