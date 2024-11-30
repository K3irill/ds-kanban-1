import { axiosClassic, instance } from '@/api/axios';
import { IUser, ILoginData } from '@/types/auth.type';
import { saveTokenStorage } from './auth.helper';

interface TypeAccessToken {
  token: string;
}

class AuthService {
  static async login(data: ILoginData) {
    const response = await axiosClassic.post<TypeAccessToken>(
      `/auth/token?email=${data.email}&password=${data.email}`,
      data
    );

    if (response.data.token) saveTokenStorage(response.data.token);
    return response;
  }

  static async getUser() {
    const response = await instance.get<IUser>(`/auth/user`);
    return response;
  }
}

export default AuthService;
