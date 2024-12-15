'use client';

import { create } from 'zustand';

export interface TaskState {
  // isModalTask: boolean;
  idTask: any;
  setIdTask: (/* isModal: boolean, */ idTask: any) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  // isModalTask: false,
  idTask: null,
  setIdTask: (/* isModalTask: boolean, */ idTask: any) => {
    set({
      /* isModalTask, */
      idTask,
    });
  },
}));

export default useTaskStore;
