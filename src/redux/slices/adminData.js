import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const adminSlice = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveData } = adminSlice.actions;

export default adminSlice.reducer;
