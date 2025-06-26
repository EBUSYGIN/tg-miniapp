import axios from 'axios';
import { userApi } from '../api';
import type { IUser, IUserCreate } from '../types';

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

const getUserById = async (id: string) => {
  try {
    const { data } = await axios.get<IUser>(userApi.getUser(id));
    return data;
  } catch (e) {
    console.log('Error fetching user');
    console.log(e);
    return null;
  }
};

const getAllUsers = async (): Promise<ApiResponse<IUser[]>> => {
  try {
    const response = await axios.get<IUser[]>(userApi.getAllUsers());
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

const createUser = async (
  userData: IUserCreate
): Promise<ApiResponse<IUser>> => {
  try {
    const response = await axios.post(userApi.createUser(), userData);
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

    // Для непредвиденных ошибок (не Axios)
    return {
      success: false,
      error: {
        message: 'Неизвестная ошибка',
        details: e,
      },
    };
  }
};

const getUserApplications = async (): Promise<ApiResponse<IUser[]>> => {
  try {
    const response = await axios.get(userApi.getUserApplications());
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
          message: e.response?.data.message || e.message,
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

const approveUser = async (userId: string): Promise<ApiResponse<IUser>> => {
  try {
    const response = await axios.post(userApi.approveUser(userId));
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

    // Для непредвиденных ошибок (не Axios)
    return {
      success: false,
      error: {
        message: 'Неизвестная ошибка',
        details: e,
      },
    };
  }
};

export const userHandler = {
  getUserById,
  getAllUsers,
  createUser,
  getUserApplications,
  approveUser,
};
