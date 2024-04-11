import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const historySlice = createSlice({
  name: 'historyData',
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveData } = historySlice.actions;

export default historySlice.reducer;
