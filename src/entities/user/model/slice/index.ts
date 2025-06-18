import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../types';
import { getUserById } from '../asyncActions';

const initialState: IUserState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.loadingState = 'loading';
    });

    builder.addCase(getUserById.fulfilled, (state, action) => {
      Object.assign(state, {
        loadingState: 'success',
        profile: { ...action.payload },
      });
    });

    builder.addCase(getUserById.rejected, (state) => {
      state.loadingState = 'error';
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
