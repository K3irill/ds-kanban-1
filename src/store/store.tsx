import { create } from 'zustand';
import { IUser } from '@/types/auth.type';
import { getAccessToken, removeAccessFromStorage, saveTokenStorage } from '@/services/auth.helper';

interface AuthState {
  isAuthorized: boolean;
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: !!localStorage.getItem('ACCESS_TOKEN'),
  user: null,
  token: getAccessToken(),

  setUser: (user, token) => {
    saveTokenStorage(token);
    set({
      isAuthorized: true,
      user,
      token,
    });
  },
  logout: () => {
    removeAccessFromStorage();
    set({
      isAuthorized: false,
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;
