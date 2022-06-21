import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

import { PROPS_USER_CREATE } from "../../types/user_types";
import { API_URL } from "../../utils/api";

export const asyncUserCreate = createAsyncThunk(
  "auth/user/create",
  async (user_info: PROPS_USER_CREATE) => {
    const res = await axios.post(
      `${API_URL}/rest_api/user/register/`,
      user_info,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const asyncGetAllUsers = createAsyncThunk("user/get/all", async () => {
  const res = await axios.get(`${API_URL}/rest_api/user/list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const asyncGetMyProfile = createAsyncThunk("profile/get", async () => {
  const res = await axios.get(`${API_URL}/rest_api/compose/myprofile/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const asyncGetMyUser = createAsyncThunk(
  "user/get",
  async (user_pk: string) => {
    const res = await axios.get(`${API_URL}/rest_api/user/detail/${user_pk}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    myprofile: [
      {
        id: "",
        username: "",
        userProfile: "",
      },
    ],
    allUsers: [
      {
        id: "",
        last_login: "",
        username: "",
        is_active: false,
        is_admin: false,
        is_superuser: false,
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
    builder.addCase(asyncGetMyProfile.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
  },
});

export const selectMyprofile = (state: RootState) => state.user.myprofile;
export const selectAllUsers = (state: RootState) => state.user.allUsers;

export default userSlice.reducer;
