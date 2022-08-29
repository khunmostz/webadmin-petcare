import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "asdasdas",
    password: "",
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export const userSelector = (store)=> store.user;

export default userSlice.reducer;
