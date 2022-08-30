import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../../utils/firebaseConfig";
import * as serverService from "../../services/serverService";

const auth = getAuth(app);

export const signIn = createAsyncThunk("user/signin", async (value) => {
  const response = await signInWithEmailAndPassword(
    auth,
    value.email,
    value.password
  ).then((value) => {
    console.log(value);
  });

  return value;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
  },
  reducers: {
    resetUsername: (state, action) => {
      state.username = action.payload.newUsername;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.email = action.payload.email;
    });
  },
});

export const { resetUsername } = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
