'use client';

import { create } from 'zustand';
import {
  getAccessToken,
  getUserData,
  removeAccessFromStorage,
  removeUserData,
  saveTokenStorage,
  saveUserData,
} from '@/services/services.helper';
import { IUser } from '@/types/user.type';

export interface AuthState {
  isAuthorized: boolean;
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  logout: () => void;
  initialize: () => void;
}
export interface MainState {
  isCreatedModalOpen: boolean;

  setIsCreatedModalOpen: () => void;
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

export const useMainStore = create<MainState>((set) => ({
  isCreatedModalOpen: false,

  setIsCreatedModalOpen: () => {
    set((state: any) => ({
      isCreatedModalOpen: !state.isCreatedModalOpen,
    }));
  },
}));
export default useAuthStore;
