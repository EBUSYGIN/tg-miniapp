import { createAsyncThunk } from '@reduxjs/toolkit';
import { userHandler } from '../../handler';

export const getUserById = createAsyncThunk(
  'user/getById',
  async (userId: string) => {
    const user = await userHandler.getUserById(userId);
    return user;
  }
);
