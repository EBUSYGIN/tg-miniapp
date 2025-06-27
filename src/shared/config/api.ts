import axios from 'axios';
// Импортируй функцию получения initDataRaw (уточни путь при необходимости)
import { retrieveRawInitData } from '../lib';

export const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const initDataRaw = retrieveRawInitData();
  if (
    initDataRaw &&
    config.headers &&
    typeof config.headers.set === 'function'
  ) {
    config.headers.set('Authorization', `tma ${initDataRaw}`);
  }
  return config;
});
