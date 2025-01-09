import { axiosClassic, instance } from '@/api/api';
import {
  IUser,
  ILoginData,
  UserSchema,
  accessTokenShema,
  TypeAccessToken,
} from '@/types/user.type';

import { ZodError } from 'zod';
import { saveTokenStorage } from './services.helper';

class UserService {
  // идем получать токен
  static async login(data: ILoginData) {
    try {
      const response = await axiosClassic.post<TypeAccessToken>(
        `/auth/token?email=${data.email}&password=${data.password}`,
        data
      );
      const fetchedToken = accessTokenShema.parse(response.data);
      saveTokenStorage(fetchedToken.token);
      return fetchedToken;
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error);
      throw error;
    }
  }

  // тянем профиль юзера который залогинился
  static async getIUser() {
    try {
      const response = await instance.get<{ data: IUser }>(`/auth/user`);

      return UserSchema.parse(response.data.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
      }
      return error;
    }
  }

  // тянем профиль юзера по id(любого)
  static async getUserId(id: number) {
    try {
      const response = await instance.get<{ data: IUser }>(`/user/${id}}`);

      return UserSchema.parse(response.data.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
      }
      return error;
    }
  }
}

export default UserService;
