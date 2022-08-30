import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import app from "../../utils/firebaseConfig";

import * as serverService from "../../services/serverService";

export const getUser = createAsyncThunk("get/user", async (_) => {
  console.log(await serverService.getUsers());
  return await serverService.getUsers();
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    userList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export const dashboardSelector = (state) => state.dashboard;

export default dashboardSlice.reducer;
