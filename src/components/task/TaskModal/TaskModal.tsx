import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useEffect } from 'react';

import Loader from '@/components/ui/Loader/loader';
import FileDropzone from './FileDropzone/FileDropzone';
import styles from './TaskModal.module.scss';

interface PropsTaskModal {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  task: any;
  isLoading: boolean;
}

const TaskModal: React.FC<PropsTaskModal> = ({ setIsModal, isModal, isLoading, task }) => (
  <Dialog className={styles.modal} open={isModal} onClose={() => setIsModal(false)}>
    <DialogPanel className={styles.wapperModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.contentTask}>
          <DialogTitle className={styles.nameTask}>{task.name}</DialogTitle>

          <div dangerouslySetInnerHTML={{ __html: task.description }} />
          <FileDropzone />
        </div>
      )}
    </DialogPanel>
  </Dialog>
);

export default TaskModal;
