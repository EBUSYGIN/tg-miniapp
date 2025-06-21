import { API_URL } from '../../../shared/config/api';

export const taskApi = {
  createTask: () => `${API_URL}/tasks/`,
  getTasks: () => `${API_URL}/tasks/`,
  getTask: (id: string) => `${API_URL}/tasks/${id}`,
  getInWork: (taskId: string) => `${API_URL}/tasks/${taskId}/to-work/`,
};
