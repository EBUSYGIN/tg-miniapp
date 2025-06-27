import axios from 'axios';
import { retrieveRawInitData } from '../lib';

export const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  try {
    const initDataRaw = retrieveRawInitData();

    if (initDataRaw && initDataRaw.trim() !== '' && config.headers) {
      config.headers.set('Authorization', `tma ${initDataRaw}`);
    }
  } catch (error) {
    console.error('Ошибка в интерсепторе запроса:', error);
  }

  return config;
});
