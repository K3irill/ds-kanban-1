import axios, { CreateAxiosDefaults } from 'axios';

import { getContentType } from './api.helper';

export const API_URL = 'https://trainee-academy.devds.ru/api';

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true,
};

export const axiosClassic = axios.create(axiosOptions);

export const instance = axios.create(axiosOptions);
