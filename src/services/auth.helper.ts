export const getAccessToken = () => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  localStorage.setItem('ACCESS_TOKEN', accessToken);
};

export const removeAccessFromStorage = () => {
  localStorage.removeItem('ACCESS_TOKEN');
};
