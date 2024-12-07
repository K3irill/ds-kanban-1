'use client';

import { create } from 'zustand';

export interface TaskState {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  isModal: false,

  setIsModal: (isModal: boolean) => {
    set({
      isModal,
    });
  },
}));

export default useTaskStore;
