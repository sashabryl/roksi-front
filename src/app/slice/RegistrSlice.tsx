import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    addRegistrationAction: (state, action) => {
      state.registration.access = action.payload.access;
      state.registration.refresh = action.payload.refresh;
    },
  },
});

export const { addRegistrationAction } = registrationSlice.actions;

export default registrationSlice.reducer;