'use client';

import { create } from 'zustand';

export interface TaskState {
  // isModalTask: boolean;
  idTask: number | null;
  setIdTask: (/* isModal: boolean, */ idTask: number | null) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  // isModalTask: false,
  idTask: null,
  setIdTask: (/* isModalTask: boolean, */ idTask: number | null) => {
    set({
      /* isModalTask, */
      idTask,
    });
  },
}));

export default useTaskStore;
