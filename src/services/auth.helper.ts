import Cookies from 'js-cookie';
import { IUser } from '@/types/auth.type';

export const getAccessToken = () => {
  const accessToken = Cookies.get('ACCESS_TOKEN');
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set('ACCESS_TOKEN', accessToken, {
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeAccessFromStorage = () => {
  Cookies.remove('ACCESS_TOKEN');
};

export const getUserData = () => {
  const userData = Cookies.get('USER');
  return userData || null;
};

export const saveUserData = (user: IUser) => {
  Cookies.set('USER', JSON.stringify(user), { sameSite: 'strict', expires: 1 });
};

export const removeUserData = () => {
  Cookies.remove('USER');
};
