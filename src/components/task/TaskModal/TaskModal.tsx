import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import useTask from '@/hooks/useTask';
import Loader from '@/components/ui/Loader/loader';
import SelectUi from '@/components/ui/Select/Select';
import WriteComment from './WriteComment/WriteComment';
import ListComments from './ListComments/ListComments';

import styles from './TaskModal.module.scss';

interface PropsTaskModal {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  // task: any;
  // isLoading: boolean;
  id: number;
}

const TaskModal: React.FC<PropsTaskModal> = ({ setIsModal, isModal, id }) => {
  const { task, isLoading } = useTask(String(String(id)));

  console.log(task);

  return (
    <Dialog className={styles.modal} open={isModal} onClose={() => setIsModal(false)}>
      <DialogPanel className={styles.wapperModal}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.contentTask}>
              <DialogTitle className={styles.nameTask}>{task.name}</DialogTitle>
              <div dangerouslySetInnerHTML={{ __html: task.description }} />
              <WriteComment />
              <ListComments />
            </div>
            <div className={styles.taskDetails}>
              <div className={styles.top}>
                <div className={styles.actionPanel}>
                  <div className={styles.idTask}>id:{task.id}</div>
                  <div className={styles.actionBtn}>
                    <button type="button" className={styles.iconButton}>
                      {}
                      <svg viewBox="0 0 20 20" width="20" height="20">
                        <use href="/sprite.svg#changeTask" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={styles.select}>
                  <SelectUi
                    possibleTaskNextStages={task.possibleTaskNextStages}
                    stage={task.stage}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </DialogPanel>
    </Dialog>
  );
};
export default TaskModal;
