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
  static async login(data: ILoginData) {
    const response = await axiosClassic.post<TypeAccessToken>(
      `/auth/token?email=${data.email}&password=${data.password}`,
      data
    );
    try {
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
    const response = await instance.get<{ data: IUser }>(`/auth/user`);
    try {
      const fetchedUser = UserSchema.parse(response.data.data);

      return fetchedUser;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
      }
      return error;
    }
  }

  // тянем профиль юзера по id(любого)
  static async getUserId(id: number) {
    const response = await instance.get<{ data: IUser }>(`/user/${id}}`);

    try {
      const fetchedUser = UserSchema.parse(response.data.data);

      return fetchedUser;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
      }
      return error;
    }
  }
}

export default UserService;
