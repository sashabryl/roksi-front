import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const languageSlice = createSlice({
  name: 'language',
  initialState: initialState,
  reducers: {
    changeLanguageAction: (state, { payload }) => {
      state.language = payload;
    },
  },
});

export const { changeLanguageAction } = languageSlice.actions;

export default languageSlice.reducer;
