import Cookies from 'js-cookie';

export const getAccessToken = () => {
  const accessToken = Cookies.get('ACCESS_TOKEN');
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set('ACCESS_TOKEN', accessToken);
};

export const removeFromStorage = () => {
  Cookies.remove('ACCESS_TOKEN');
};
