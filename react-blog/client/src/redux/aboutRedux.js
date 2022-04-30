import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    currentAbout: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getAboutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAboutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentAbout = action.payload;
      state.error = false;
    },
    getAboutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE
    updateAboutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateAboutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentAbout = action.payload;
      state.error = false;
    },
    updateAboutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAboutStart,
  getAboutSuccess,
  getAboutFailure,
  updateAboutStart,
  updateAboutSuccess,
  updateAboutFailure,
} = aboutSlice.actions;

export default aboutSlice.reducer;
