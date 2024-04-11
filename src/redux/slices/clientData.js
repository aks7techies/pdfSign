import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const clientSlice = createSlice({
  name: 'clientData',
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveData } = clientSlice.actions;

export default clientSlice.reducer;
