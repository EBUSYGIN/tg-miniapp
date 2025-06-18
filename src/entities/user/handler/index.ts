import axios from 'axios';
import { userApi } from '../api';
import type { IUser } from '../types';

const getUserById = async (id: string) => {
  try {
    const { data } = await axios.get<IUser>(userApi.getUser(id));
    return data;
  } catch (e) {
    console.log('Error fetching user');
    return null;
  }
};

export const userHandler = {
  getUserById,
};
