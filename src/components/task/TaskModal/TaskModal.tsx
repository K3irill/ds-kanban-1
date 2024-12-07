import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import useTaskStore from '@/store/taskStore';

import useTask from '@/hooks/useTask';
import { useRouter } from 'next/router';
import styles from './TaskModal.module.scss';

const TaskModal = () => {
  const { isModalTask, setIsModalTask, idTask } = useTaskStore();

  const { task } = useTask(String(idTask));
  return (
    <Dialog className={styles.modal} open={isModalTask} onClose={() => setIsModalTask(false, null)}>
      <DialogPanel className={styles.block}>
        <DialogTitle>Payment successful</DialogTitle>
        <p>
          Your payment has been successfully submitted. We’ve sent you an email with all of the
          details of your order.
        </p>
        <div className="mt-4">
          <button type="button" onClick={() => setIsModalTask(false, null)}>
            Got it, thanks!
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default TaskModal;
