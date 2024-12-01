import { axiosClassic, instance } from '@/api/axios';
import {
  IUser,
  ILoginData,
  UserSchema,
  accessTokenShema,
  TypeAccessToken,
} from '@/types/auth.type';
import { ZodError } from 'zod';
import { saveTokenStorage } from './auth.helper';

class AuthService {
  static async login(data: ILoginData) {
    const response = await axiosClassic.post<TypeAccessToken>(
      `/auth/token?email=${data.email}&password=${data.password}`,
      data
    );

    const fetchedToken = accessTokenShema.parse(response.data);

    saveTokenStorage(fetchedToken.token);

    return fetchedToken;
  }

  static async getUser() {
    try {
      const response = await instance.get<{ data: IUser }>(`/auth/user`);
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

export default AuthService;
