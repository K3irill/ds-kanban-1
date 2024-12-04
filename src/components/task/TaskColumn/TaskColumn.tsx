import React from 'react';
import styles from './TaskColumn.module.scss';

interface TaskColumnProps {
  children: React.ReactNode;
  heading: string;
  taskCount: number;
}
const TaskColumn = ({ children, heading, taskCount }: TaskColumnProps) => (
  <div className={styles.column}>
    <div className={styles['column__heading-wrapper']}>
      <h3 className={styles.column__heading}>{heading}</h3>
      <span className={styles.column__taskCount}>{taskCount}</span>
    </div>
    <div className={styles.column__item}>{children}</div>
  </div>
);

export default TaskColumn;
