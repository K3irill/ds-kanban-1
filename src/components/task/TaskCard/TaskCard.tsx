import React from 'react';
import cn from 'classnames';
import PriorityItem from '@/components/TaskPriorityItem/TaskPriorityItem';
import Link from 'next/link';
import styles from './TaskCard.module.scss';
import TaskType from '../TaskType/TaskType';
import TaskComponent from '../TaskComponent/TaskComponent';

const TaskCard = ({ id, priority, name, users, task_type, task_component, epic }) => (
  <Link href={String(id)} className={cn(styles.task)}>
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
            {user.name}
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
  </Link>
);

export default TaskCard;
