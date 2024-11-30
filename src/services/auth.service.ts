import { API_URL } from '@/api/axios';
import { IUser, ILoginData } from '@/types/auth.type';

interface TypeAccessToken {
  token: string;
}

class AuthService {
  static async login(data: ILoginData): Promise<TypeAccessToken> {
    const response = await fetch(
      `${API_URL}/auth/token?email=${data.email}&password=${data.email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Ошибка при выполнение запроса');
    }

    const responseData: TypeAccessToken = await response.json();
    return responseData;
  }

  static async getUser(): Promise<IUser> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }

    const responseData: IUser = await response.json();

    return responseData;
  }
}

export default AuthService;
