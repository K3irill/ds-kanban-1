import cn from 'classnames';
import styles from './TaskPriorityItem.module.scss';

interface PriorityItemProps {
  type: number;
}

const TASK_PRIORITY = [
  {
    name: 'Низкий',
    type: 'low',
  },
  {
    name: 'Средний',
    type: 'medium',
  },
  {
    name: 'Высокий',
    type: 'high',
  },
];

const TaskPriorityItem = ({ type: type_id }: PriorityItemProps) => (
  <div className={cn(styles.priority, styles[`priority--${TASK_PRIORITY[type_id].type}`])}>
    <span>{TASK_PRIORITY[type_id].name}</span>
  </div>
);

export default TaskPriorityItem;
