import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const registrationSlice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    addRegistrationAction: (state, { payload }) => {
      state.registration = payload;
    },
  },
});

export const { addRegistrationAction } = registrationSlice.actions;

export default registrationSlice.reducer;