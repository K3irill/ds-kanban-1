import React, { MouseEvent, useEffect, useState } from 'react';
import cn from 'classnames';
import PriorityItem from '@/components/TaskPriorityItem/TaskPriorityItem';
import Link from 'next/link';

import { useRouter } from 'next/router';
import useTask from '@/hooks/useTask';
import styles from './TaskCard.module.scss';
import TaskType from '../TaskType/TaskType';
import TaskComponent from '../TaskComponent/TaskComponent';
import TaskModal from '../TaskModal/TaskModal';

const TaskCard = ({ id, priority, name, users, task_type, task_component }) => {
  const [isModal, setIsModal] = useState(false);
  const { task, isLoading } = useTask(String(String(id)));
  const router = useRouter();
  const { slug } = router.query;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsModal(true);
    e.preventDefault();

    /* eslint-disable-next-line no-restricted-globals */
    // history.pushState({}, '', `/projects/${slug}/${id}`);
    // router.push(`/projects/${slug}/${id}`, undefined, { shallow: true });
  };

  useEffect(() => {
    console.log(task);
  }, [task]);
  return (
    <>
      <Link
        href={`/projects/${slug}/${id}`}
        onClick={(e) => handleClick(e)}
        className={cn(styles.task)}
      >
        <div className={cn(styles.task__header)}>
          <p className={cn(styles['task__task-id'])}>
            id: <span>{id}</span>
          </p>
          <PriorityItem type={priority} />
        </div>
        <div className={cn(styles.task__main)}>
          <h4 className={cn(styles['task__task-name'])}>{name}</h4>
          {/* {users.map((user, index) => (
          <span className={cn(styles.task__user)} key={user.id}>
            {user.name}
            {users.length > 1 && users.at(-1) !== index - 1 && ','}
          </span>
        ))} */}
        </div>
        <div className={cn(styles.task__footer)}>
          {task_component && <TaskComponent component={task_component} />}

          <TaskType type={task_type} />
        </div>
      </Link>
      {isModal && (
        <TaskModal
          id={id}
          isModal={isModal}
          task={task}
          isLoading={isLoading}
          setIsModal={setIsModal}
        />
      )}
    </>
  );
};
export default TaskCard;
