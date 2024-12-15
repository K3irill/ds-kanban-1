import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useEffect } from 'react';
import useTask from '@/hooks/useTask';
import Loader from '@/components/ui/Loader/loader';
import Select from '@/components/ui/Select/Select';
import TaskPriorityItem from '@/components/TaskPriorityItem/TaskPriorityItem';
import { formatDateUtils } from '@/utils/utils';
import { useMainStore } from '@/store/store';
import WriteComment from './WriteComment/WriteComment';
import ListComments from './ListComments/ListComments';

import styles from './TaskModal.module.scss';
import TaskComponent from '../TaskComponent/TaskComponent';
import TaskType from '../TaskType/TaskType';

interface PropsTaskModal {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  // task: any;
  // isLoading: boolean;
  id: number;
}

const TaskModal: React.FC<PropsTaskModal> = ({ setIsModal, isModal, id }) => {
  const { task, isLoading } = useTask(String(String(id)));
  const { setIsCreatedModalOpen, setModalType } = useMainStore();

  const handleEditButton = () => {
    setIsCreatedModalOpen();
    setModalType('editing');
  };
  useEffect(() => {
    // debugger;
    console.log(task);
  }, [task]);

  return (
    <Dialog className={styles.modal} open={isModal} onClose={() => setIsModal(false)}>
      <div className={styles.modalWrap}>
        <DialogPanel className={styles.wapperModal}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.contentTask}>
                <DialogTitle className={styles.nameTask}>{task.name}</DialogTitle>
                <div dangerouslySetInnerHTML={{ __html: task.description }} />
                <WriteComment id={id} />
                <ListComments comments={task.comments} />
              </div>
              <div className={styles.taskDetails}>
                <div className={styles.top}>
                  <div className={styles.actionPanel}>
                    <div className={styles.idTask}>id:{task.id}</div>
                    <div className={styles.actionBtn}>
                      <button
                        onClick={handleEditButton}
                        type="button"
                        className={styles.iconButton}
                      >
                        <svg viewBox="0 0 20 20" width="20" height="20">
                          <use href="/sprite.svg#changeTask" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={styles.select}>
                    {task?.possibleTaskNextStages.length !== 0 && (
                      <Select
                        task={task}
                        possibleTaskNextStages={task.possibleTaskNextStages}
                        stage={task.stage}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.tags}>
                  <div className={styles.tagItem}>
                    <div className={styles.label}>Приоритет</div>
                    {!!task.priority && <TaskPriorityItem priority={task.priority} />}
                  </div>
                  <div className={styles.tagItem}>
                    <div className={styles.label}>Компонент</div>

                    {task.component && <TaskComponent component={task.component} />}
                  </div>{' '}
                  <div className={styles.tagItem}>
                    <div className={styles.label}>Тип</div>

                    {task.task_type && <TaskType type={task.task_type} />}
                  </div>
                </div>
                <div className={styles.evaluation}>
                  <span>Оценка</span>
                  <span>
                    {task.total_logged_time}
                    <svg viewBox="0 0 18 18" width="18" height="18">
                      <use href="/sprite.svg#time" />
                    </svg>
                  </span>
                </div>
                <div className={styles.date}>
                  <div className={styles.dateItem}>
                    <div className={styles.label}>Дата создания</div>
                    <div className={styles.dateContent}>
                      <svg viewBox="0 0 13 13" width="13" height="13">
                        <use href="/sprite.svg#calendar" />
                      </svg>
                      {formatDateUtils(task.begin)}
                    </div>
                  </div>
                  <div className={styles.dateItem}>
                    <div className={styles.label}>Дата начала</div>
                    <div className={styles.dateContent}>
                      <svg viewBox="0 0 13 13" width="13" height="13">
                        <use href="/sprite.svg#calendar" />
                      </svg>
                      {formatDateUtils(task.end)}
                    </div>
                  </div>
                  <div />
                </div>
                <div className={styles.executor}>
                  <div className={styles.label}>Исполнитель</div>
                  {task.users?.map((it, indx) => (
                    <div key={indx} className={styles.executorItem}>
                      <img
                        src={
                          it.avatar
                            ? `https://trainee-academy.devds.ru/${it.avatar.link}`
                            : '/default_user.png'
                        }
                        alt="Исполнитель"
                      />
                      {it.name}
                    </div>
                  ))}
                </div>
                <div className={styles.executor}>
                  <div className={styles.label}>Постановщик</div>

                  <div className={styles.executorItem}>
                    <img
                      src={
                        task.created_by.avatar
                          ? `https://trainee-academy.devds.ru/${task.created_by.avatar.link}`
                          : '/default_user.png'
                      }
                      alt="Постановщик"
                    />
                    {task.created_by.patronymic}
                  </div>
                </div>
                {task.layout_link && (
                  <div>
                    <div className={styles.label}>Layout Link</div>
                    <a
                      href={`https://trainee-academy.devds.ru/${task.layout_link}`}
                      className={styles.link}
                    >
                      {task.layout_link}
                    </a>
                  </div>
                )}
                {task.dev_link && (
                  <div>
                    <div className={styles.label}>Dev Link</div>
                    <a
                      className={styles.link}
                      href={`https://trainee-academy.devds.ru/${task.dev_link}`}
                    >
                      {task.dev_link}
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
export default TaskModal;
