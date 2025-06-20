import { API_URL } from '../../../shared/config/api';

export const taskApi = {
  getInWork: (taskId: string) => `${API_URL}/tasks/${taskId}/to-work/`,
};
