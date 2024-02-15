import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const chartSlice = createSlice({
  name: 'chart',
  initialState: initialState,
  reducers: {
    changeChartAction: (state, { payload }) => {
      state.chart = payload;
    },
  },
});

export const { changeChartAction } = chartSlice.actions;

export default chartSlice.reducer;