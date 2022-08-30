import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice";

const reducer = {
  user: userReducer,
  dashboard: dashboardReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});
