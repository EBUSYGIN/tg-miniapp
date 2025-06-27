import { api } from '../../../shared/config/api';
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
    const { data } = await api.post(taskApi.getInWork(taskId), {
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
    const response = await api.post(taskApi.createTask(), taskData);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e: unknown) {
    // @ts-expect-error: isAxiosError is not a method on AxiosInstance, use Axios static
    if (e && typeof e === 'object' && api.defaults && (e as any).isAxiosError) {
      const err = e as any;
      return {
        success: false,
        error: {
          message: err.response?.data?.message || err.message,
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
    const response = await api.get<ITask[]>(taskApi.getTasks());
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    if (api.isAxiosError(e)) {
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
    const response = await api.get<ITask[]>(taskApi.getArchivedTasks());
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    if (api.isAxiosError(e)) {
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
    const response = await api.get<ITask>(taskApi.getTask(id));
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    if (api.isAxiosError(e)) {
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
