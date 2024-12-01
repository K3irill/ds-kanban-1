'use client';

import { create } from 'zustand';
import { IUser } from '@/types/auth.type';

import {
  getAccessToken,
  getUserData,
  removeAccessFromStorage,
  removeUserData,
  saveTokenStorage,
  saveUserData,
} from '@/services/auth.helper';

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
      const user = getUserData();

      if (token && user) {
        set({
          isAuthorized: true,
          token,
          user: JSON.parse(user),
        });
      } else {
        set({
          isAuthorized: false,
          token: null,
          user: null,
        });
      }
    }
  },
  setUser: (user, token) => {
    saveTokenStorage(token);
    saveUserData(user);
    set({
      isAuthorized: true,
      user,
      token,
    });
  },
  logout: () => {
    removeAccessFromStorage();
    removeUserData();
    set({
      isAuthorized: false,
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;
