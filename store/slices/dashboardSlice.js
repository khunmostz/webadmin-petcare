import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import app from "../../utils/firebaseConfig";

import * as serverService from "../../services/serverService";

export const getUser = createAsyncThunk("get/user", async (_) => {
  // console.log(await serverService.getUsers());
  return await serverService.getUsers();
});

export const getPositions = createAsyncThunk("get/location", async (_) => {
  console.log(await serverService.getLocations());
  return await serverService.getLocations();
});

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    userList: [],
    locationList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userList = action.payload.users;
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.locationList = action.payload.locations;
    });
  },
});

export const dashboardSelector = (store) => store.dashboard;

export default dashboardSlice.reducer;
