import { API_URL } from '../../../shared/config/api';

export const userApi = {
  getUser: (id?: string) => `${API_URL}/users/${id}`,
  createUser: () => `${API_URL}/users/`,
  getAllUsers: () => `${API_URL}/users/`,
};
