import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import {
  PROPS_POST_DATE,
  PROPS_POST_YEAR_AND_MONTH,
} from "../../types/date_types";
import { API_URL } from "../../utils/api";

export const asyncGetAllDate = createAsyncThunk("date/get", async () => {
  const res = await axios.get(`${API_URL}/rest_api/compose/date/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const asyncCreateDate = createAsyncThunk(
  "date/post",
  async (data: PROPS_POST_DATE) => {
    const res = await axios.post(`${API_URL}/rest_api/compose/date/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const asyncGetAllYearAndMonth = createAsyncThunk(
  "YearAndMonth/get",
  async () => {
    const res = await axios.get(`${API_URL}/rest_api/compose/year_month/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const asyncCreateYearAndMonth = createAsyncThunk(
  "YearAndMonth/post",
  async (data: PROPS_POST_YEAR_AND_MONTH) => {
    const res = await axios.post(
      `${API_URL}/rest_api/compose/year_month/`,
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

export const dataSlice = createSlice({
  name: "date",
  initialState: {
    allDate: [
      {
        id: 0,
        year_and_month: 0,
        create_day: 0,
      },
    ],
    allYearAndMonth: [
      {
        id: 0,
        create_year: 0,
        create_month: 0,
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetAllDate.fulfilled, (state, action) => {
      state.allDate = action.payload;
    });
    builder.addCase(asyncGetAllYearAndMonth.fulfilled, (state, action) => {
      state.allYearAndMonth = action.payload;
    });
    builder.addCase(asyncCreateYearAndMonth.fulfilled, (state, action) => {
      state.allYearAndMonth = [action.payload, ...state.allYearAndMonth];
    });
    builder.addCase(asyncCreateDate.fulfilled, (state, action) => {
      state.allDate = [action.payload, ...state.allDate];
    });
  },
});

export const selectAllDate = (state: RootState) => state.date.allDate;
export const selectAllYearAndMonth = (state: RootState) =>
  state.date.allYearAndMonth;

export default dataSlice.reducer;
