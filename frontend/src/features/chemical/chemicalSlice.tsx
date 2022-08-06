import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import {
  PROPS_ALL_CHEMICALS,
  PROPS_POST_CHEMICAL,
} from "../../types/chemical_types";
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
    const res = await axios.delete(
      `${API_URL}/rest_api/compose/chemical/${chem_id}/`,
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

export const asyncPutChemical = createAsyncThunk(
  "chemical/put",
  async (put_info: PROPS_ALL_CHEMICALS) => {
    const res = await axios.put(
      `${API_URL}/rest_api/compose/chemical/${put_info.id}/`,
      put_info,
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

export const asyncGetAllChemicalShippedFor = createAsyncThunk(
  "shipped/get",
  async () => {
    const res = await axios.get(`${API_URL}/rest_api/compose/shipped_for/`, {
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
    openChemEdit: false,
    isChemLoading: false,
    chemPostInfo: {
      chemName: 1,
      chemAmount: 0,
      chemShippedFor: 1,
      year: year,
      month: month,
      day: day,
    },
    chemPutInfo: {
      id: "",
      created_at: "",
      updated_at: "",
      used_amount: 0,
      is_registerd: false,
      name: 0,
      used_date: 0,
      used_user: "",
      shipped_for: 0,
    },
    allChemicals: [
      {
        id: "",
        name: 0,
        used_amount: 0,
        used_date: 0,
        used_user: "",
        shipped_for: 0,
        is_registerd: false,
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
    allShippedFor: [
      {
        id: 0,
        shipped_for: "",
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
    startChemEdit(state) {
      state.openChemEdit = true;
    },
    endChemEdit(state) {
      state.openChemEdit = false;
    },
    startChemLoading(state) {
      state.isChemLoading = true;
    },
    endChemLoading(state) {
      state.isChemLoading = false;
    },
    // Post edit
    editChemPostName(state, action) {
      state.chemPostInfo.chemName = action.payload;
    },
    editChemPostShippedFor(state, action) {
      state.chemPostInfo.chemShippedFor = action.payload;
    },
    editChemPostAmount(state, action) {
      state.chemPostInfo.chemAmount = action.payload;
    },
    editPostYear(state, action) {
      state.chemPostInfo.year = action.payload;
    },
    editPostMonth(state, action) {
      state.chemPostInfo.month = action.payload;
    },
    editPostDay(state, acion) {
      state.chemPostInfo.day = acion.payload;
    },
    resetChemPostInfo(state) {
      state.chemPostInfo.chemAmount = 0;
      state.chemPostInfo.year = year;
      state.chemPostInfo.month = month;
      state.chemPostInfo.day = day;
      state.chemPostInfo.chemName = 1;
    },
    // Put edit
    editChemPutInfo(state, action) {
      state.chemPutInfo = action.payload;
    },
    editChemPutAmount(state, action) {
      state.chemPutInfo.used_amount = action.payload;
    },
    editChemPutName(state, action) {
      state.chemPutInfo.name = action.payload;
    },
    editChemPutShippedFor(state, action) {
      state.chemPutInfo.shipped_for = action.payload;
    },
    editChemPutIsRegisterd(state, action) {
      state.chemPutInfo.is_registerd = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetAllChemicals.fulfilled, (state, action) => {
      state.allChemicals = action.payload;
    });
    builder.addCase(asyncGetAllChemicalNames.fulfilled, (state, action) => {
      state.allChemicalNames = action.payload;
    });
    builder.addCase(
      asyncGetAllChemicalShippedFor.fulfilled,
      (state, action) => {
        state.allShippedFor = action.payload;
      }
    );
  },
});

export const {
  startChemPost,
  endChemPost,
  startChemEdit,
  endChemEdit,
  startChemLoading,
  endChemLoading,
  resetChemPostInfo,
  editChemPostAmount,
  editChemPostName,
  editChemPostShippedFor,
  editChemPutInfo,
  editPostDay,
  editPostMonth,
  editPostYear,
  editChemPutAmount,
  editChemPutIsRegisterd,
  editChemPutName,
  editChemPutShippedFor,
} = chemicalSlice.actions;

export const selectAllChemicals = (state: RootState) =>
  state.chemical.allChemicals;
export const selectAllChemicalNames = (state: RootState) =>
  state.chemical.allChemicalNames;
export const selectOpenChemPost = (state: RootState) =>
  state.chemical.openChemPost;
export const selectOpenChemEdit = (state: RootState) =>
  state.chemical.openChemEdit;
export const selectChemPostInfo = (state: RootState) =>
  state.chemical.chemPostInfo;
export const selectChemPutInfo = (state: RootState) =>
  state.chemical.chemPutInfo;
export const selectIsChemLoading = (state: RootState) =>
  state.chemical.isChemLoading;
export const selectAllShippedFor = (state: RootState) =>
  state.chemical.allShippedFor;

export default chemicalSlice.reducer;
