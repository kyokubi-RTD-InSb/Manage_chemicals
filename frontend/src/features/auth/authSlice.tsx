import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { PROPS_AUTHEN } from "../../types/auth_types";
import { API_URL } from "../../utils/api";

export const asyncFetchJWTToken = createAsyncThunk(
  "auth/jwt/post",
  async (authen: PROPS_AUTHEN) => {
    const res = await axios.post(`${API_URL}/authen/jwt/create/`, authen, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    openSignIn: true,
    openSignUp: false,
    isAuthLoading: false,
  },
  reducers: {
    startSignIn(state) {
      state.openSignIn = true;
    },
    endSignIn(state) {
      state.openSignIn = false;
    },
    startSignUp(state) {
      state.openSignUp = true;
    },
    endSignUp(state) {
      state.openSignUp = false;
    },
    startIsAuthLoading(state) {
      state.isAuthLoading = true;
    },
    endIsAuthLoading(state) {
      state.isAuthLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncFetchJWTToken.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
    });
  },
});

export const {
  startIsAuthLoading,
  startSignIn,
  startSignUp,
  endIsAuthLoading,
  endSignIn,
  endSignUp,
} = authSlice.actions;

export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp;
export const selectIsAuthLoading = (state: RootState) =>
  state.auth.isAuthLoading;

export default authSlice.reducer;
