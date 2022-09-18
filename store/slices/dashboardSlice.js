import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import app from "../../utils/firebaseConfig";

import * as serverService from "../../services/serverService";

export const getUser = createAsyncThunk("get/user", async (_) => {
  // console.log(await serverService.getUsers());
  return await serverService.getUsers();
});

export const getPositions = createAsyncThunk("get/location", async (_) => {
  // console.log(await serverService.getLocations());
  return await serverService.getLocations();
});

export const getPromotions = createAsyncThunk("get/promotions", async (_) => {
  // console.log(await serverService.getPromotion());
  return await serverService.getPromotion();
});
export const getPets = createAsyncThunk("get/pets", async (_) => {
  // console.log(await serverService.getPets());
  return await serverService.getPets();
});

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    userList: [],
    locationList: [],
    promotionsList: [],
    petsList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userList = action.payload.users;
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.locationList = action.payload.locations;
    });
    builder.addCase(getPromotions.fulfilled, (state, action) => {
      state.promotionsList = action.payload.promotions;
    });
    builder.addCase(getPets.fulfilled, (state, action) => {
      state.petsList = action.payload.pets;
    });
  },
});

export const dashboardSelector = (store) => store.dashboard;

export default dashboardSlice.reducer;
