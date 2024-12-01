'use client';

import { create } from 'zustand';
import { IUser } from '@/types/auth.type';
import { getAccessToken, removeAccessFromStorage, saveTokenStorage } from '@/services/auth.helper';

interface AuthState {
  isAuthorized: boolean;
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  user: null,
  token: null,

  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = getAccessToken();
      set({
        isAuthorized: !!token,
        token,
      });
    }
  },

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
