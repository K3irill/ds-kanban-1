import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';

import Loader from '@/components/ui/Loader/loader';

import Dropzone from 'react-dropzone-uploader';
import styles from './TaskModal.module.scss';
import WriteComment from './WriteComment/WriteComment';
import ListComments from './ListComments/ListComments';
import FileDropzone from './FileDropzone/FileDropzone';

interface PropsTaskModal {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  task: any;
  isLoading: boolean;
  id: number;
}

const TaskModal: React.FC<PropsTaskModal> = ({ setIsModal, isModal, isLoading, task, id }) => (
  <Dialog className={styles.modal} open={isModal} onClose={() => setIsModal(false)}>
    <DialogPanel className={styles.wapperModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.contentTask}>
          <DialogTitle className={styles.nameTask}>{task.name}</DialogTitle>

          <div dangerouslySetInnerHTML={{ __html: task.description }} />
          {/* <FileDropzone /> */}

          <WriteComment />
          <ListComments />
        </div>
      )}
    </DialogPanel>
  </Dialog>
);

export default TaskModal;
