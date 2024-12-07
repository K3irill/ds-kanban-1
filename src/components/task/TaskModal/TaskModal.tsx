import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useEffect } from 'react';
import useTaskStore from '@/store/taskStore';
import useTask from '@/hooks/useTask';
import Loader from '@/components/ui/Loader/loader';
import FileDropzone from './FileDropzone/FileDropzone';
import styles from './TaskModal.module.scss';

const TaskModal = () => {
  const { isModalTask, setIsModalTask, idTask } = useTaskStore();

  const { task, isFetching } = useTask(String(idTask));
  console.log('taskApi', task);

  useEffect(() => {}, []);
  return (
    <Dialog className={styles.modal} open={isModalTask} onClose={() => setIsModalTask(false, null)}>
      <DialogPanel className={styles.wapperModal}>
        {isFetching ? (
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
};

export default TaskModal;
