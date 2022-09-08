import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../../utils/firebaseConfig";
import * as serverService from "../../services/serverService";
import Router from "next/router";

const auth = getAuth(app);

export const signIn = createAsyncThunk("user/signin", async (value) => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      value.email,
      value.password
    ).then((value) => {
      Router.push("/dashboard");
    });
  } catch (error) {
    alert("ไม่พบข้อมูลในระบบ");
  }

  return value;
});

export const logOut = createAsyncThunk("user/singout", async (_) => {
  return await signOut(auth);
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
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.email = "";
    });
  },
});

export const { resetUsername } = userSlice.actions;

export const userSelector = (store) => store.user;

export default userSlice.reducer;
