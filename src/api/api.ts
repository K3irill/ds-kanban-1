import axios, { CreateAxiosDefaults } from 'axios';
import { getAccessToken } from '@/services/services.helper';

const API_URL = 'https://trainee-academy.devds.ru/api';

export const IS_CLIENT = typeof window === 'undefined';

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const axiosClassic = axios.create(axiosOptions);

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  const newConfig = { ...config };

  if (newConfig?.headers && accessToken) {
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return newConfig;
});
