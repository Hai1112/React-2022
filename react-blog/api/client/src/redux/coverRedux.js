import { createSlice } from "@reduxjs/toolkit";

const coverSlice = createSlice({
  name: "cover",
  initialState: {
    currentCover: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getCoverStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCoverSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCover = action.payload;
      state.error = false;
    },
    getCoverFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateCoverStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCoverSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCover = action.payload;
      state.error = false;
    },
    updateCoverFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCoverStart,
  getCoverSuccess,
  getCoverFailure,
  updateCoverStart,
  updateCoverSuccess,
  updateCoverFailure,
} = coverSlice.actions;

export default coverSlice.reducer;
