import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
  loading: false,
  error: null
};

const ProfileData = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileDataLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        profileDataSuccess: (state, action) => {
            state.profileData = action.payload;
            state.loading = false;
        },
        profileDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { profileDataLoading, profileDataSuccess, profileDataError } = ProfileData.actions;

export default ProfileData.reducer;

export const fetchData = (values) => async (dispatch) => {
    dispatch(profileDataLoading());

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockProfileData = values;

        dispatch(profileDataSuccess(mockProfileData));
    } catch (error) {
        dispatch(profileDataError(error.message));
        console.error("Error:", error);
    }
};
