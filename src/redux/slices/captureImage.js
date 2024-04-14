import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const captureImageSlice = createSlice({
  name: 'captureImage',
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveData } = captureImageSlice.actions;

export default captureImageSlice.reducer;
