import { IUserData } from '@/types/auth.type';

interface TypeAccessToken {
  token: string;
}
const API_URL = 'https://trainee-academy.devds.ru/api';
export const IS_CLIENT = typeof window === 'undefined';

class AuthService {
  static async login(data: IUserData): Promise<TypeAccessToken> {
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
}

export default AuthService;
