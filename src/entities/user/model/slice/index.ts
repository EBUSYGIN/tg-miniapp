import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../types';
import { getUserById } from '../asyncActions';
import { getUserId, getUserImage } from '../../../../shared/lib';

const initialState: IUserState = {
  isRegistered: null,
  userTelegramId: getUserId(),
  userImage: getUserImage(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.loadingState = 'loading';
    });

    builder.addCase(getUserById.fulfilled, (state, action) => {
      if (action.payload === false) {
        state.isRegistered = false;
        return;
      }

      Object.assign(state, {
        loadingState: 'success',
        isRegistered: true,
        profile: { ...action.payload },
      });

      // state.loadingState = 'success';
      // state.isRegistered = true;
      // state.profile = { ...action.payload };
    });

    builder.addCase(getUserById.rejected, (state) => {
      state.loadingState = 'error';
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
