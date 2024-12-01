import Cookies from 'js-cookie';

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
