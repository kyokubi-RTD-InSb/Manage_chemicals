import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { PROPS_POST_CHEMICAL } from "../../types/chemical_types";
import { API_URL } from "../../utils/api";

export const asyncGetAllChemicals = createAsyncThunk(
  "chemical/get",
  async () => {
    const res = await axios.get(`${API_URL}/rest_api/compose/chemical/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const asyncCreateChemical = createAsyncThunk(
  "chemical/post",
  async (data: PROPS_POST_CHEMICAL) => {
    const res = await axios.post(
      `${API_URL}/rest_api/compose/chemical/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const asyncDeleteChemical = createAsyncThunk(
  "chemical/delete",
  async (chem_id: string) => {
    const res = await axios.delete(`${API_URL}/rest_api/compose/chemical/${chem_id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const asyncGetAllChemicalNames = createAsyncThunk(
  "chemName/get",
  async () => {
    const res = await axios.get(`${API_URL}/rest_api/compose/chemical_name/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

const today = new window.Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

export const chemicalSlice = createSlice({
  name: "chemical",
  initialState: {
    openChemPost: false,
    isChemLoading: false,
    chemPostInfo: {
      chemName: 1,
      chemAmount: 1,
      year: year,
      month: month,
      day: day,
    },
    allChemicals: [
      {
        id: "",
        name: 0,
        used_amount: 0,
        used_date: 0,
        used_user: "",
        created_at: "",
        updated_at: "",
      },
    ],
    allChemicalNames: [
      {
        id: 0,
        name: "",
      },
    ],
  },
  reducers: {
    startChemPost(state) {
      state.openChemPost = true;
    },
    endChemPost(state) {
      state.openChemPost = false;
    },
    startChemLoading(state) {
      state.isChemLoading = true;
    },
    endChemLoading(state) {
      state.isChemLoading = false;
    },
    editChemName(state, action) {
      state.chemPostInfo.chemName = action.payload;
    },
    editChemAmount(state, action) {
      state.chemPostInfo.chemAmount = action.payload;
    },
    editYear(state, action) {
      state.chemPostInfo.year = action.payload;
    },
    editMonth(state, action) {
      state.chemPostInfo.month = action.payload;
    },
    editDay(state, acion) {
      state.chemPostInfo.day = acion.payload;
    },
    resetChemPostInfo(state) {
      state.chemPostInfo.chemAmount = 0;
      state.chemPostInfo.year = year;
      state.chemPostInfo.month = month;
      state.chemPostInfo.day = day;
      state.chemPostInfo.chemName = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetAllChemicals.fulfilled, (state, action) => {
      state.allChemicals = action.payload;
    });
    builder.addCase(asyncGetAllChemicalNames.fulfilled, (state, action) => {
      state.allChemicalNames = action.payload;
    });
  },
});

export const {
  startChemPost,
  endChemPost,
  startChemLoading,
  endChemLoading,
  resetChemPostInfo,
  editChemAmount,
  editChemName,
  editDay,
  editMonth,
  editYear,
} = chemicalSlice.actions;

export const selectAllChemicals = (state: RootState) =>
  state.chemical.allChemicals;
export const selectAllChemicalNames = (state: RootState) =>
  state.chemical.allChemicalNames;
export const selectOpenChemPost = (state: RootState) =>
  state.chemical.openChemPost;
export const selectChemPostInfo = (state: RootState) =>
  state.chemical.chemPostInfo;
export const selectIsChemLoading = (state: RootState) =>
  state.chemical.isChemLoading;

export default chemicalSlice.reducer;
