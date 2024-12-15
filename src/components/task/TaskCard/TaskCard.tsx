import React, { MouseEvent, useEffect, useState } from 'react';

import cn from 'classnames';
import PriorityItem from '@/components/TaskPriorityItem/TaskPriorityItem';
import Link from 'next/link';
import useTaskStore from '@/store/taskStore';
import styles from './TaskCard.module.scss';
import TaskType from '../TaskType/TaskType';
import TaskComponent from '../TaskComponent/TaskComponent';
import TaskModal from '../TaskModal/TaskModal';

const TaskCard = ({ id, priority, name, users, task_type, task_component, epic }) => {
  const [isModal, setIsModal] = useState(false);
  const { idTask, setIdTask } = useTaskStore();

  useEffect(() => {}, []);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsModal(true);
    e.preventDefault();
    setIdTask(id);
    // router.push(`/projects/${slug}/${id}`, undefined, { shallow: true });
  };
  useEffect(() => {
    // if (!isModal) {
    //   setIdTask(null);
    // }
    console.log(idTask);
  }, [isModal]);

  return (
    <Link href={String(id)} onClick={(e) => handleClick(e)} className={cn(styles.task)}>
      <div className={cn(styles.task__header)}>
        <p className={cn(styles['task__task-id'])}>
          id: <span>{id}</span>
        </p>
        {!!priority && <PriorityItem priority={priority} />}
      </div>
      <div className={cn(styles.task__main)}>
        <h4 className={cn(styles['task__task-name'])}>{name}</h4>
        <div className={cn(styles['task__users-wrap'])}>
          {users.map((user, index) => (
            <span className={cn(styles.task__user)} key={user.id}>
              {`${user.name} ${user.surname}`}
              {index < users.length - 1 && ','}
            </span>
          ))}
        </div>

        {epic && (
          <p className={cn(styles['task__epic-name'])}>
            Эпик: <span>{epic}</span>
          </p>
        )}
      </div>
      <div className={cn(styles.task__footer)}>
        {task_component && <TaskComponent component={task_component} />}
        {task_type && <TaskType type={task_type} />}
      </div>
      {isModal && (
        <TaskModal
          id={id}
          isModal={isModal}
          // task={task}
          // isLoading={isLoading}
          setIsModal={setIsModal}
        />
      )}
    </Link>
  );
};

export default TaskCard;
