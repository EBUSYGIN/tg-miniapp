import axios from 'axios';
import { taskApi } from '../api';
import type { ITask, ICreateTaskRequest } from '../types';

// Тип для успешного ответа
type SuccessResponse<T> = {
  success: true;
  data: T;
  status: number;
};

// Тип для ошибки
type ErrorResponse = {
  success: false;
  error: {
    message: string;
    status?: number;
    details?: any;
  };
};

// Общий тип возвращаемого значения
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

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

const createTask = async (
  taskData: ICreateTaskRequest
): Promise<ApiResponse<ITask>> => {
  try {
    const response = await axios.post(taskApi.createTask(), taskData);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        success: false,
        error: {
          message: e.response?.data?.message || e.message,
          status: e.response?.status,
          details: e.response?.data,
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'Неизвестная ошибка',
        details: e,
      },
    };
  }
};

const getTasks = async (): Promise<ApiResponse<ITask[]>> => {
  try {
    const response = await axios.get<ITask[]>(taskApi.getTasks());
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        success: false,
        error: {
          message: e.response?.data?.message || e.message,
          status: e.response?.status,
          details: e.response?.data,
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'Неизвестная ошибка',
        details: e,
      },
    };
  }
};

const getArchiveTasks = async (): Promise<ApiResponse<ITask[]>> => {
  try {
    const response = await axios.get<ITask[]>(taskApi.getArchivedTasks());
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        success: false,
        error: {
          message: e.response?.data?.message || e.message,
          status: e.response?.status,
          details: e.response?.data,
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'Неизвестная ошибка',
        details: e,
      },
    };
  }
};

const getTask = async (id: string): Promise<ApiResponse<ITask>> => {
  try {
    const response = await axios.get<ITask>(taskApi.getTask(id));
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        success: false,
        error: {
          message: e.response?.data?.message || e.message,
          status: e.response?.status,
          details: e.response?.data,
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'Неизвестная ошибка',
        details: e,
      },
    };
  }
};

export const taskHandler = {
  getInWork,
  createTask,
  getTasks,
  getTask,
  getArchiveTasks,
};
