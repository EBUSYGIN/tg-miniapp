import { createAsyncThunk } from '@reduxjs/toolkit';
import { userHandler } from '../../handler';
import { RootState } from '../../../../app/store/store';

export const getUserById = createAsyncThunk(
  'user/getById',
  async (_, thunkApi) => {
    const { userTelegramId } = (thunkApi.getState() as RootState).user;

    if (!userTelegramId) {
      return thunkApi.rejectWithValue('User Telegram ID not available');
    }

    const user = await userHandler.getUserById(userTelegramId);
    if (user === null) {
      return false;
    }

    return user;
  }
);
