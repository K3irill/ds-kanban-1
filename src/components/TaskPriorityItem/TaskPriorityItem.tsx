import cn from 'classnames';
import styles from './TaskPriorityItem.module.scss';

interface PriorityItemProps {
  type: number;
}

const TASK_PRIORITY = [
  {
    type: 'high',
  },

  {
    type: 'medium',
  },
  {
    type: 'low',
  },
];

const TaskPriorityItem = ({ priority }: PriorityItemProps) => (
  <div className={cn(styles.priority, styles[`priority--${TASK_PRIORITY[priority.id - 1].type}`])}>
    <span>{priority.name}</span>
  </div>
);

export default TaskPriorityItem;
