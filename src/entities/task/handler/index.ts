import axios from 'axios';
import { taskApi } from '../api';

const getInWork = async (userId: string, taskId: string) => {
  try {
    const { data } = await axios.post(taskApi.getInWork(taskId), {
      executor_id: userId,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const taskHandler = {
  getInWork,
};
