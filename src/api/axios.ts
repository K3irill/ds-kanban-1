import axios, { CreateAxiosDefaults } from 'axios';
import { getAccessToken } from '@/services/auth.helper';
import { getContentType } from './api.helper';

const API_URL = 'https://trainee-academy.devds.ru/api';

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
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
